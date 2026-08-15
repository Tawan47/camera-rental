import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const adminUsername =
      this.configService.getOrThrow<string>('ADMIN_USERNAME');
    const adminPasswordHash = this.configService.getOrThrow<string>(
      'ADMIN_PASSWORD_HASH',
    );

    const isValidPassword = await bcrypt.compare(password, adminPasswordHash);
    const isValidUsername = username === adminUsername;

    if (!isValidUsername || !isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: adminUsername, username: adminUsername };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
