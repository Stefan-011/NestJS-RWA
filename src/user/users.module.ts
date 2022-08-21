import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { MyTeamModule } from 'src/my-team/my-team.module';


@Module({
    imports: [TypeOrmModule.forFeature([User]),MyTeamModule],
    exports:[UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UserModule {}
