import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jtw.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports:[UserModule,PassportModule,JwtModule.register({
    secret:'SECRET', //ZAMENI
    signOptions: {expiresIn: '1d'},

  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers:[AuthController],
  exports:[AuthService]
})
export class AuthModule {}
