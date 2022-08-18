import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Players } from 'src/players/entities/players.entity';
import { Sponzor } from 'src/sponzor/entities/sponzor.entities';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { MyTeam } from './entities/Myteam.entity';
import { PlayerDto } from 'src/players/dto/players.dto'
import { UserDto } from 'src/user/dto/user.dto';
import { MyTeamModule } from './my-team.module';

@Injectable()
export class MyTeamService {
    constructor(
      @InjectRepository(MyTeam) private MyteamRepo: Repository<MyTeam>, 
      @InjectRepository(Sponzor) private SponzorRepo: Repository<Sponzor>,
      @InjectRepository(Players) private PlayerRepo: Repository<Players>,
      @InjectRepository(User) private UserRepo: Repository<User>
      ){}

      async GetMyTeam(OwnerID:number)
      {
        const MeOwner = await this.UserRepo.findOne({where:{id:OwnerID}})
       
        const team = await this.MyteamRepo.findOne({where:{Owner:MeOwner}})
        const players = await this.PlayerRepo.find({where:{MyTeam:team}})
         return{
           //team, ovde treba sponzor
           players
         }
       // if(!MeOwner.MyTeam)
       // {
        //  MeOwner.MyTeam = new MyTeam()
        // MeOwner.MyTeam.name = MeOwner.username;
         // MeOwner.MyTeam.Owner = await this.UserRepo.findOne({where:{id:OwnerID}});// await this.MyteamRepo.save(MeOwner.MyTeam)
      //  }
       // const {Owner, ... data} = MeOwner.MyTeam
     //   return MeOwner.MyTeam.MyPlayers; 
      }


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

    async AddPlayer(OwnerID:number,PlayerId:number)
    {
      const FoundOwner = await this.UserRepo.findOne({where:{id:OwnerID}})
      const Team = await this.MyteamRepo.findOne({where:{Owner:FoundOwner}})
      const ThatPlayer = await this.PlayerRepo.findOne({where:{id:PlayerId}})
      const CheckPlayer = await this.PlayerRepo.findOne({where:{team:FoundOwner.username , nick:ThatPlayer.nick}})
      
       
     if(CheckPlayer != undefined)
     return null;
     //return Error("Igrac je u vec u vasem timu")
        
   
      const NewPlayer = new Players()
      NewPlayer.img = ThatPlayer.img
      NewPlayer.impact = ThatPlayer.impact
      NewPlayer.kd =ThatPlayer.kd
      NewPlayer.lname =ThatPlayer.lname
      NewPlayer.name = ThatPlayer.name
      NewPlayer.nick = ThatPlayer.nick
      NewPlayer.price = ThatPlayer.price
      NewPlayer.rating = ThatPlayer.rating
      NewPlayer.team = FoundOwner.username
      NewPlayer.MyTeam =  await this.MyteamRepo.findOne({where:{Owner:FoundOwner}})

      
  
     
      // Team.MyPlayers.push(NewPlayer)
      // return Team.MyPlayers
       console.log("posle")
      
       await this.MyteamRepo.save(Team)
       return await this.PlayerRepo.save(NewPlayer)
    }

    async RemovePlayer(OwnerID:number,PlayerID:number)
    {
     // const Owner = await this.UserRepo.findOne({where:{id:OwnerID}})
     // const Team = await this.MyteamRepo.findOne({where:{Owner:Owner}})
      const DelPlayer = await this.PlayerRepo.findOne({where:{id:PlayerID}})
      return await this.PlayerRepo.remove(DelPlayer)
      /*const SortArray = [] as Players[]
      Team.MyPlayers;
      for(let i = 0, j=0; i < SortArray.length; i++,j++)
      {
        if(DelPlayer == Team.MyPlayers[j] )
        j++;

        SortArray[i] = Team.MyPlayers[j];  
      }
      Team.MyPlayers = SortArray;
      await this.MyteamRepo.save(Team)*/
      //await this.MyteamRepo.update(TeamID,Team)
    }

    async CreateMyTeam(id:number)
    {
      const Owner = await this.UserRepo.findOne({where:{id:id}})
      console.log("cela")
      const NewTeam = new MyTeam();
      NewTeam.Owner = Owner;
      NewTeam.name = Owner.username;
      NewTeam.MyPlayers = [] 
      
      return await this.MyteamRepo.save(NewTeam);
    }


    async CheckPlayer(username:string,PlayerNick:string)
    {
      const Owner = await this.UserRepo.find({where:{username:username}})
      const player = await this.PlayerRepo.find({where:{nick:PlayerNick, team:username }})
      return player;
    }

}
