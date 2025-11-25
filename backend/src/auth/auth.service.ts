import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly hardcodedEmail = 'admin@example.com';
  private readonly hardcodedPassword = 'admin123';
  private readonly token = 'abc123';

  login(email: string, password: string) {
    if (email === this.hardcodedEmail && password === this.hardcodedPassword) {
      return { token: this.token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
