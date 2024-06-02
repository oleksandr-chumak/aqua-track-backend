import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CodeService {

  generateCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const codeLength = 6;
    let result = '';

    for (let i = 0; i < codeLength; i++) {
      const isLetter = Math.random() < 0.5;
      if (isLetter) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * digits.length);
        result += digits[randomIndex];
      }
    }

    return result;
  }

  hashCode(code: string): Promise<string> {
    return bcrypt.hash(code, 10);
  }

  compareCode(code: string, hashedCode: string): Promise<boolean> {
    return bcrypt.compare(code, hashedCode);
  }
}
