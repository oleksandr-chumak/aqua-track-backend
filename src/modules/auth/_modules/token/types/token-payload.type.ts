export interface AccessTokenPayload {
  id: number;
}

export interface RefreshTokenPayload {
  id: number;
}

export interface EmailConfirmationTokenPayload {
  email: string;
  code: string; // hash
}

export interface PasswordResetTokenPayload {
  email: string;
  code: string; // hash
}

export type PayloadWithTimestamp<T> = T & { iat: number; exp: number };
