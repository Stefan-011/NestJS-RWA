import { Players } from 'src/players/entities/players.entity';
import { Sponzor } from 'src/sponzor/entities/sponzor.entity';
import { MyTeamController } from './my-team.controller';
import { User } from 'src/user/entities/user.entity';
import { MyTeam } from './entities/Myteam.entity';
import { MyTeamService } from './my-team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';


@Module({
  imports: [TypeOrmModule.forFeature([MyTeam]),TypeOrmModule.forFeature([Sponzor]),TypeOrmModule.forFeature([Players]),TypeOrmModule.forFeature([User])],
  exports:[MyTeamService],
  controllers: [MyTeamController],
  providers: [MyTeamService]
})
export class MyTeamModule {}
