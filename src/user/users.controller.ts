import {
  Controller,
  Get,
  Param,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/Enums/Role';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Get('GetMyProfile')
  public GetMyProfile(@Request() req) {
    if (req) return this.UserService.FindMyProfile(req.user.email);
  }

  @Get('SaveChanges:money')
  public SaveChanges(@Request() req, @Param('money') money: number) {
    return this.UserService.SaveChanges(req.user.id, money);
  }
}
