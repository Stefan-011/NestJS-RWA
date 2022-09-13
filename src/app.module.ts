import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './user/users.controller';
import { UserModule } from './user/users.module';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { PlayersModule } from './players/players.module';
import { SponzorModule } from './sponzor/sponzor.module';
import { SponzorController } from './sponzor/sponzor.controller';
import { SponzorService } from './sponzor/sponzor.service';
import { UsersService } from './user/users.service';
import { MyTeamController } from './my-team/my-team.controller';
import { MyTeamModule } from './my-team/my-team.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jtw.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    PlayersModule,
    SponzorModule,
    MyTeamModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController, MyTeamController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
