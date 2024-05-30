import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  async sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: jwt.Secret,
    options: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
        err ? reject(err) : resolve(token);
      });
    });
  }

  async verify(
    token: string,
    secretOrPublicKey: jwt.Secret,
    options: jwt.VerifyOptions,
  ): Promise<jwt.Jwt | jwt.JwtPayload | string | null> {
    return new Promise((resolve) => {
      jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
        err ? resolve(null) : resolve(decoded);
      });
    });
  }
}
