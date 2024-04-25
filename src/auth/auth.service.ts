import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(userId: number): Promise<string> {
    const payload = { userId };
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
