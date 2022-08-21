import { Players } from 'src/players/entities/players.entity';
import { Sponzor } from 'src/sponzor/entities/sponzor.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MyTeam } from './entities/Myteam.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';



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
        const sponzor = await this.SponzorRepo.findOne({where:{MyTeam:team}})
         return{
            sponzor,
            players
         }
      }


    async AddSponzor(UserID:number,SponzorID:number)
    {
      const Owner = await this.UserRepo.findOne({where:{id:UserID}})
      const Team = await this.MyteamRepo.findOne({where:{Owner:Owner},relations:["MySponzor"]})
      const Sponzor = await this.SponzorRepo.findOne({where:{id:SponzorID}})
      Team.MySponzor = Sponzor;
      Owner.money = +Owner.money + +Sponzor.money;
      await this.UserRepo.save(Owner)
      await this.MyteamRepo.save(Team)
      return Sponzor;
    }

    async RemoveSponzor(UserID:number)
    {
      const Owner = await this.UserRepo.findOne({where:{id:UserID}})
      const Team = await this.MyteamRepo.findOne({where:{Owner:Owner}})
 
      Owner.money = Owner.money - await (await this.SponzorRepo.findOne({where:{MyTeam:Team}})).money
      Team.MySponzor = null;
  
      await this.UserRepo.save(Owner);
      await this.MyteamRepo.save(Team)
      return true;
    }

    async AddPlayer(OwnerID:number,PlayerId:number)
    {
      const FoundOwner = await this.UserRepo.findOne({where:{id:OwnerID}});
      const Team = await this.MyteamRepo.findOne({where:{Owner:FoundOwner}});
      const ThatPlayer = await this.PlayerRepo.findOne({where:{id:PlayerId}});
      const CheckPlayer = await this.PlayerRepo.findOne({where:{MyTeam:Team,nick:ThatPlayer.nick}});
       
     if(CheckPlayer != undefined)
       return null;
          
      const NewPlayer = new Players();
      NewPlayer.img = ThatPlayer.img;
      NewPlayer.impact = ThatPlayer.impact;
      NewPlayer.kd =ThatPlayer.kd;
      NewPlayer.lname =ThatPlayer.lname;
      NewPlayer.name = ThatPlayer.name;
      NewPlayer.nick = ThatPlayer.nick;
      NewPlayer.price = ThatPlayer.price;
      NewPlayer.rating = ThatPlayer.rating;
      NewPlayer.team = FoundOwner.username;
      NewPlayer.MyTeam =  await this.MyteamRepo.findOne({where:{Owner:FoundOwner}});
      
      FoundOwner.money = FoundOwner.money - NewPlayer.price

       await this.UserRepo.save(FoundOwner);
       await this.MyteamRepo.save(Team);
       return await this.PlayerRepo.save(NewPlayer);
    }


    async RemovePlayer(OwnerID:number,PlayerID:number)
    {
      const Owner = await this.UserRepo.findOne({where:{id:OwnerID}})
      const DelPlayer = await this.PlayerRepo.findOne({where:{id:PlayerID}})
      Owner.money = +Owner.money + +DelPlayer.price;

      await this.UserRepo.save(Owner);
      return await this.PlayerRepo.remove(DelPlayer);
    }

    
    async CreateMyTeam(id:number)
    {
      const Owner = await this.UserRepo.findOne({where:{id:id}})
      const NewTeam = new MyTeam();
      NewTeam.Owner = Owner;
      NewTeam.name = Owner.username;
      NewTeam.MyPlayers = []; 
      return await this.MyteamRepo.save(NewTeam);
    }
}
