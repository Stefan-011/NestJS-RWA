import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersService } from './players.service';
import { Players } from './entities/players.entity';
import { PlayersController } from './players.controller';


@Module({
    imports: [TypeOrmModule.forFeature([Players])],
    exports:[PlayersService],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}
