import { TokenServiceInterface } from '../interfaces/token-service.interface';
import { PayloadWithTimestamp } from '../types/token-payload.type';

export class TokenContext<T> implements TokenServiceInterface<T> {
  private readonly strategy: TokenServiceInterface<T>;

  constructor(tokenService: TokenServiceInterface<T>) {
    this.strategy = tokenService;
  }

  async sign(payload: T): Promise<string> {
    return this.strategy.sign(payload);
  }

  async verify(token: string): Promise<PayloadWithTimestamp<T> | null> {
    return this.strategy.verify(token);
  }
}
