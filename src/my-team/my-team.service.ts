import { Players } from 'src/players/entities/players.entity';
import { Sponzor } from 'src/sponzor/entities/sponzor.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MyTeam } from './entities/Myteam.entity';
import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { MyTeamDto } from './dto/MyTeamDto';
import { ShopErrorMsg } from 'src/Enums/ShopErrorMsg';
import { PanelErrorMessage } from 'src/Enums/PanelErrorMessage';
import { TeamType } from 'src/Enums/TeamType';

@Injectable()
export class MyTeamService {
  constructor(
    @InjectRepository(MyTeam) private MyteamRepo: Repository<MyTeam>,
    @InjectRepository(Sponzor) private SponzorRepo: Repository<Sponzor>,
    @InjectRepository(Players) private PlayerRepo: Repository<Players>,
    @InjectRepository(User) private UserRepo: Repository<User>,
  ) {}

  async GetMyTeam(OwnerID: number) {
    const MeOwner = await this.UserRepo.findOne({ where: { id: OwnerID } });
    const team = await this.MyteamRepo.findOne({ where: { Owner: MeOwner } });
    const players = await this.PlayerRepo.find({ where: { MyTeam: team } });
    const sponzor = await this.SponzorRepo.findOne({ where: { MyTeam: team } });
    return {
      sponzor,
      players,
    };
  }

  async AddSponzor(UserID: number, SponzorID: number) {
    const Owner = await this.UserRepo.findOne({ where: { id: UserID } });
    const Team = await this.MyteamRepo.findOne({
      where: { Owner: Owner },
      relations: ['MySponzor'],
    });

    let CurrentSponzor = await this.SponzorRepo.findOne({
      where: { MyTeam: Team },
    });

    if (CurrentSponzor)
      return {
        Server_response: ShopErrorMsg.ActiveSponzorDealError,
        Package: null,
      };

    const Sponzor = await this.SponzorRepo.findOne({
      where: { id: SponzorID },
    });

    Team.MySponzor = Sponzor;
    Owner.money = +Owner.money + +Sponzor.money;
    await this.UserRepo.save(Owner);
    await this.MyteamRepo.save(Team);

    return {
      Server_response: ShopErrorMsg.SponzorAccepted,
      Package: Sponzor,
    };
  }

  async RemoveSponzor(UserID: number) {
    const Owner = await this.UserRepo.findOne({ where: { id: UserID } });
    const Team = await this.MyteamRepo.findOne({ where: { Owner: Owner } });

    let CurrentSponzor = await this.SponzorRepo.findOne({
      where: { MyTeam: Team },
    });

    let PayBackMoney = CurrentSponzor.money;
    if (+PayBackMoney > +Owner.money)
      return {
        Server_response: ShopErrorMsg.BreakingSponzorDealError,
      };

    const NewMoney = Owner.money - PayBackMoney;
    Owner.money = NewMoney;
    Team.MySponzor = null;

    await this.UserRepo.save(Owner);
    await this.MyteamRepo.save(Team);
    return {
      Server_response: ShopErrorMsg.none,
    };
  }

  async AddPlayer(OwnerID: number, PlayerId: number) {
    const FoundOwner = await this.UserRepo.findOne({ where: { id: OwnerID } });

    const Team = await this.MyteamRepo.findOne({
      where: { Owner: FoundOwner },
    });
    const PlayersOfTeam = await this.PlayerRepo.findAndCount({
      where: { MyTeam: Team },
    });

    const ThatPlayer = await this.PlayerRepo.findOne({
      where: { id: PlayerId },
    });
    const CheckPlayer = await this.PlayerRepo.findOne({
      where: { MyTeam: Team, nick: ThatPlayer.nick },
    });

    if (CheckPlayer != undefined)
      return {
        Server_response: ShopErrorMsg.PlayerAlreadyInTeamError,
        Package: null,
      };

    if (ThatPlayer.price > +FoundOwner.money + +1)
      return {
        Server_response: ShopErrorMsg.NoEnoughMoneyError,
        Package: null,
      };

    if (PlayersOfTeam[1] == 5)
      return {
        Server_response: ShopErrorMsg.FullTeamError,
        Package: null,
      };

    const NewPlayer = new Players();
    NewPlayer.img = ThatPlayer.img;
    NewPlayer.impact = ThatPlayer.impact;
    NewPlayer.kd = ThatPlayer.kd;
    NewPlayer.lname = ThatPlayer.lname;
    NewPlayer.name = ThatPlayer.name;
    NewPlayer.nick = ThatPlayer.nick;
    NewPlayer.price = ThatPlayer.price;
    NewPlayer.rating = ThatPlayer.rating;
    NewPlayer.team = FoundOwner.username;
    NewPlayer.MyTeam = await this.MyteamRepo.findOne({
      where: { Owner: FoundOwner },
    });

    FoundOwner.money = FoundOwner.money - NewPlayer.price;

    await this.UserRepo.save(FoundOwner);
    await this.MyteamRepo.save(Team);
    await this.PlayerRepo.save(NewPlayer);
    return {
      Server_response: ShopErrorMsg.none,
      Package: NewPlayer,
    };
  }

  async RemovePlayer(OwnerID: number, PlayerID: number) {
    const Owner = await this.UserRepo.findOne({ where: { id: OwnerID } });
    const DelPlayer = await this.PlayerRepo.findOne({
      where: { id: PlayerID },
    });
    Owner.money = +Owner.money + +DelPlayer.price;

    await this.UserRepo.save(Owner);
    return await this.PlayerRepo.remove(DelPlayer);
  }

  async CreateMyTeam(id: number) {
    const Owner = await this.UserRepo.findOne({ where: { id: id } });
    const NewTeam = new MyTeam();
    NewTeam.Owner = Owner;
    NewTeam.name = Owner.username;
    NewTeam.MyPlayers = [];
    NewTeam.TeamType = TeamType.USER_TEAM;
    return await this.MyteamRepo.save(NewTeam);
  }

  async CreateTeam(TeamName: MyTeamDto, AdminID: number) {
    const ADMIN = await this.UserRepo.findOne({ where: { id: AdminID } });
    const TeamCheck = await this.MyteamRepo.findOne({
      where: { name: TeamName.name },
    });

    if (TeamCheck)
      return {
        Server_response: PanelErrorMessage.TeamAlreadyExists,
      };

    const NewTeam = new MyTeam();
    NewTeam.name = TeamName.name;
    NewTeam.Creator = ADMIN;
    NewTeam.TeamType = TeamType.DEFAULT_TEAM;
    await this.MyteamRepo.save(NewTeam);
    return {
      Server_response: PanelErrorMessage.none,
    };
  }

  async DeleteTeam(TeamID: number) {
    const DeleteTeam = await this.MyteamRepo.findOne({ where: { id: TeamID } });
    await this.MyteamRepo.remove(DeleteTeam);
    return {
      Server_response: PanelErrorMessage.none,
    };
  }

  async GetCreatedTeams() {
    const ALL_TEAMS = await this.MyteamRepo.find({
      where: { TeamType: TeamType.DEFAULT_TEAM },
    });

    return {
      Package: ALL_TEAMS,
      Server_response: PanelErrorMessage.none,
    };
  }

  async EditTeam(TeamDto: MyTeamDto) {
    const Team = await this.MyteamRepo.findOne({ where: { id: TeamDto.id } });

    Team.name = TeamDto.name;

    await this.MyteamRepo.save(Team);
    return {
      Server_response: PanelErrorMessage.none,
    };
  }
}
