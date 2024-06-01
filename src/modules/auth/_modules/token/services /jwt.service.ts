import * as jwt from 'jsonwebtoken';
import { TokenServiceInterface } from '../interfaces/token-service.interface';
import * as Zod from 'zod';
import { PayloadWithTimestamp } from '../types/token-payload.type';

export class JwtService<T extends object> implements TokenServiceInterface<T> {
  private readonly secretOrPrivateKey: jwt.Secret;
  private readonly options: jwt.SignOptions;
  private readonly payloadValidationSchema: Zod.Schema<PayloadWithTimestamp<T>>;

  constructor(
    secretOrPrivateKey: jwt.Secret,
    options: jwt.SignOptions,
    payloadValidationSchema: Zod.Schema<PayloadWithTimestamp<T>>,
  ) {
    this.secretOrPrivateKey = secretOrPrivateKey;
    this.options = options;
    this.payloadValidationSchema = payloadValidationSchema;
  }

  async sign(payload: T): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secretOrPrivateKey, this.options, (err, token) => {
        if (!token || err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  async verify(token: string): Promise<PayloadWithTimestamp<T> | null> {
    return new Promise((resolve) => {
      jwt.verify(
        token,
        this.secretOrPrivateKey,
        this.options,
        (err, decoded) => {
          if (err) {
            resolve(null);
          }

          const validationResult =
            this.payloadValidationSchema.safeParse(decoded);

          if (!validationResult.success || !validationResult.data) {
            resolve(null);
          } else {
            resolve(validationResult.data);
          }
        },
      );
    });
  }
}
