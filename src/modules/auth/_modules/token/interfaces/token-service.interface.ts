import { PayloadWithTimestamp } from '../types/token-payload.type';

export abstract class TokenServiceInterface<Payload> {
  abstract sign(payload: Payload): Promise<string>;
  abstract verify(token: string): Promise<PayloadWithTimestamp<Payload> | null>;
}
