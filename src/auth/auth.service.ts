// auth.service.ts
import {
  Injectable,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { Role } from 'src/common/roles/roles.enum';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };

    // Generate the tokens
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN,
    });
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: process.env.REFRESH_TOKEN },
    );

    // Return tokens
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      console.log('Received refresh token:', refreshToken); // Debug token
      const payload = this.jwtService.verify(refreshToken);
      console.log('Decoded payload:', payload); // Debug payload
      const user = await this.userService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }

      const newAccessToken = this.jwtService.sign(
        { email: user.email, sub: user.id, role: user.role },
        { expiresIn: process.env.ACCESS_TOKEN },
      );
      const newRefreshToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: process.env.REFRESH_TOKEN },
      );

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async validateUser(
    email: string,
    password: string,
    role: Role,
  ): Promise<User | null> {
    console.log('Validating user with email:', email);
    const user = await this.userService.findByEmail(email);
    console.log('Found user:', user);
    if (user) {
      console.log('Comparing password');
      const isPasswordValid = await user.comparePassword(password);
      console.log('Password valid:', isPasswordValid);
      if (isPasswordValid && user.role === role) {
        return user;
      }
    }
    return null;
  }

  async register(email: string, password: string, role: Role): Promise<User> {
    if (role === Role.Admin) {
      throw new Error('this role is not available');
    }
    return this.userService.createUser(email, password, role);
  }
}
