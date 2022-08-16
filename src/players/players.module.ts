import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Players } from './entities/players.entity';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
    imports: [TypeOrmModule.forFeature([Players])],
    exports:[PlayersService],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}
