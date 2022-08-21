import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTConst } from './model/JWTConst';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jtw.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/users.module';
import { AuthController } from './auth.controller';
import { MyTeamModule } from 'src/my-team/my-team.module';


@Module({
  imports:[UserModule,MyTeamModule,PassportModule,JwtModule.register({
    secret:JWTConst.secret,
    signOptions: {expiresIn: '1d'},

  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers:[AuthController],
  exports:[AuthService]
})
export class AuthModule {}
