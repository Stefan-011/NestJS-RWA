import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { MyTeamModule } from 'src/my-team/my-team.module';
import { typeOrmConfig } from 'typeorm.config';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]),MyTeamModule],
    exports:[UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UserModule {}
