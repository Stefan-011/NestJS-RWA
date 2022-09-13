import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Players } from './entities/players.entity';
import { PlayerDto } from './dto/players.dto';
import { MyTeam } from 'src/my-team/entities/Myteam.entity';
import { PanelErrorMessage } from 'src/Enums/PanelErrorMessage';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(MyTeam) private MyteamRepo: Repository<MyTeam>,
    @InjectRepository(Players) private PlayerRepo: Repository<Players>,
  ) {}

  GetAllByTeam(TeamName: string) {
    return this.PlayerRepo.find({ where: { team: TeamName } });
  }

  GetPlayerByID(id: number) {
    return this.PlayerRepo.findOne({ where: { id: id } });
  }

  async CreatePlayer(PlayerDto: PlayerDto, TeamID: number) {
    const Team = await this.MyteamRepo.findOne({ where: { id: TeamID } });

    const NewPlayer = new Players();
    NewPlayer.img = PlayerDto.img;
    NewPlayer.impact = PlayerDto.impact;
    NewPlayer.kd = PlayerDto.kd;
    NewPlayer.lname = PlayerDto.lname;
    NewPlayer.name = PlayerDto.name;
    NewPlayer.nick = PlayerDto.nick;
    NewPlayer.price = PlayerDto.price;
    NewPlayer.rating = PlayerDto.rating;
    NewPlayer.team = Team.name;
    NewPlayer.MyTeam = Team;

    if (NewPlayer.img == '' || NewPlayer.img == null)
      NewPlayer.img = 'https://cdn-icons-png.flaticon.com/512/32/32382.png';

    await this.PlayerRepo.save(NewPlayer);

    return {
      Server_response: PanelErrorMessage.none,
    };
  }

  async EditPlayer(PlayerDto: PlayerDto, TeamID) {
    const ToEdit = await this.PlayerRepo.findOne({
      where: { id: PlayerDto.id },
    });
    const Team = await this.MyteamRepo.findOne({ where: { id: TeamID } });

    ToEdit.img = PlayerDto.img;
    ToEdit.impact = PlayerDto.impact;
    ToEdit.kd = PlayerDto.kd;
    ToEdit.lname = PlayerDto.lname;
    ToEdit.name = PlayerDto.name;
    ToEdit.nick = PlayerDto.nick;
    ToEdit.price = PlayerDto.price;
    ToEdit.rating = PlayerDto.rating;
    ToEdit.team = Team.name;
    ToEdit.MyTeam = Team;

    await this.PlayerRepo.save(ToEdit);
    return {
      Server_respose: PanelErrorMessage.none,
    };
  }

  async DeletePlayer(id: number) {
    const ToRemove = await this.PlayerRepo.findOne({ where: { id: id } });

    console.log(ToRemove);
    await this.PlayerRepo.delete(ToRemove);
    return {
      Server_respose: PanelErrorMessage.none,
    };
  }

  async GetPlayerByTeamID(id: number) {
    const Team = await this.MyteamRepo.findOne({ where: { id: id } });
    let PlayersFromTeam;
    if (Team)
      PlayersFromTeam = this.PlayerRepo.find({ where: { MyTeam: Team } });
    else
      return {
        Server_response: PanelErrorMessage.PlayersNotFound,
      };

    return PlayersFromTeam;
  }
}
