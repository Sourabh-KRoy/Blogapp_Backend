// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Headers,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from 'src/common/roles/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  async registerUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(email, password, Role.User);
  }

  @Post('vendor/register')
  async registerVendor(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(email, password, Role.Vendor);
  }

  @Post('login')
  @HttpCode(201)
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.headers['refresh_token'] as string;

    if (!refreshToken) {
      throw new HttpException(
        'Refresh token is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const tokens = await this.authService.refresh(refreshToken);
      return tokens;
    } catch (error) {
      console.error('Error refreshing tokens:', error); // Debugging log
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }
}
