import { Body, Controller, Post, Request, SetMetadata } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { Role } from 'src/Enums/Role';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.AuthService.login(req.user);
  }

  @Post('register')
  async register(@Body() UserDto: UserDto) {
    return this.AuthService.register(UserDto);
  }
}
