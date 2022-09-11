import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersService } from './players.service';
import { Players } from './entities/players.entity';
import { PlayersController } from './players.controller';
import { MyTeam } from 'src/my-team/entities/Myteam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MyTeam]),
    TypeOrmModule.forFeature([Players]),
  ],
  exports: [PlayersService],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
