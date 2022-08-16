import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Players } from 'src/players/entities/players.entity';
import { Sponzor } from 'src/sponzor/entities/sponzor.entities';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { MyTeam } from './entities/Myteam.entity';

@Injectable()
export class MyTeamService {
    constructor(
      @InjectRepository(MyTeam) private MyteamRepo: Repository<MyTeam>, 
      @InjectRepository(Sponzor) private SponzorRepo: Repository<Sponzor>,
      @InjectRepository(Players) private PlayerRepo: Repository<Players>,
      @InjectRepository(User) private UserRepo: Repository<User>
      ){}

    async AddSponzor(TeamID:number,SponzorID:number)
    {
      const Team = await this.MyteamRepo.findOne({where:{id:TeamID},relations:["MySponzor"]})
      const Sponzor = await this.SponzorRepo.findOne({where:{id:SponzorID}})
        Team.MySponzor = Sponzor;
      await this.MyteamRepo.save(Team)
    }

    async RemoveSponzor(TeamID:number,SponzorID:number)
    {
      const Team = await this.MyteamRepo.findOne({where:{id:TeamID}})
        Team.MySponzor = null;
      await this.MyteamRepo.save(Team)
    }

    async AddPlayer(TeamID:number,PlayerID:number)
    {
      const Team = await this.MyteamRepo.findOne({where:{id:TeamID}})
      const NewPlayer = await this.PlayerRepo.findOne({where:{id:PlayerID}})
        Team.MyPlayers.push(NewPlayer);
      await this.MyteamRepo.save(Team)
    }

    async RemovePlayer(TeamID:number,PlayerID:number)
    {
      const Team = await this.MyteamRepo.findOne({where:{id:TeamID}})
      const DelPlayer = await this.PlayerRepo.findOne({where:{id:PlayerID}})
      const SortArray = [] as Players[]
      Team.MyPlayers;
      for(let i = 0, j=0; i < SortArray.length; i++,j++)
      {
        if(DelPlayer == Team.MyPlayers[j] )
        j++;

        SortArray[i] = Team.MyPlayers[j];  
      }
      Team.MyPlayers = SortArray;
      await this.MyteamRepo.save(Team)
      //await this.MyteamRepo.update(TeamID,Team)
    }

    async CreateMyTeam(UserID:number)
    {
      const NewTeam = new MyTeam();
      const Owner = await this.UserRepo.findOne({where:{id:UserID}})
      NewTeam.Owner = Owner;
      NewTeam.name = Owner.username;
      this.MyteamRepo.create(NewTeam);
    }


}
