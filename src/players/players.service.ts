import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Players } from './entities/players.entity';
import { PlayerDto } from './dto/players.dto';

@Injectable()
export class PlayersService {
constructor(@InjectRepository(Players) private playerRepo: Repository<Players>){} 

GetAllByTeam(TeamName:string)
{
    console.log(TeamName)
    return this.playerRepo.find({where:{team:TeamName}})
}

GetPlayerByID(id:number)
{
    return this.playerRepo.findOne({where:{id:id}})
}

ADDTOTABLE(PlayerDto:PlayerDto)
{
    return this.playerRepo.save(PlayerDto)
}

}
