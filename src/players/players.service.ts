import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Players } from './entities/players.entity';

@Injectable()
export class PlayersService 
{
constructor(@InjectRepository(Players) private playerRepo: Repository<Players>){} 

GetAllByTeam(TeamName:string)
{
    return this.playerRepo.find({where:{team:TeamName}})
}

GetPlayerByID(id:number)
{
    return this.playerRepo.findOne({where:{id:id}})
}

}
