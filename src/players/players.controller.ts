import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerDto } from './dto/players.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private PlayersService: PlayersService) {}

  @Get('GetAllByTeam:Teamname')
  public GetAllByTeam(@Param('Teamname') Teamname: string) {
    Teamname = Teamname.substring(1, Teamname.length);
    return this.PlayersService.GetAllByTeam(Teamname);
  }

  @Get('GetPlayerByID:id')
  public GetPlayerByID(@Param('id') id: string) {
    id = id.substring(1, id.length);
    return this.PlayersService.GetPlayerByID(parseInt(id));
  }

  @Post('CreatePlayer/:TeamID')
  public CreatePlayer(
    @Body() PlayerDto: PlayerDto,
    @Param('TeamID') TeamID: string,
  ) {
    TeamID = TeamID.substring(1, TeamID.length);
    return this.PlayersService.CreatePlayer(PlayerDto, parseInt(TeamID));
  }

  @Get('GetTeamPlayersByTeamID:TeamID')
  public GetTeamPlayersByTeamID(@Param('TeamID') TeamID: string) {
    TeamID = TeamID.substring(1, TeamID.length);
    return this.PlayersService.GetPlayerByTeamID(parseInt(TeamID));
  }

  @Put('EditPlayer/:TeamID')
  public EditPlayer(
    @Body() Player: PlayerDto,
    @Param('TeamID') TeamID: string,
  ) {
    TeamID = TeamID.substring(1, TeamID.length);
    return this.PlayersService.EditPlayer(Player, parseInt(TeamID));
  }

  @Delete('DeletePlayer/:PlayerID')
  public DeletePlayer(@Param('PlayerID') PlayerID: string) {
    return this.PlayersService.DeletePlayer(parseInt(PlayerID));
  }
}
