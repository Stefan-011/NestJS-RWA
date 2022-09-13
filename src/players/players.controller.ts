import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/Enums/Role';
import { PlayerDto } from './dto/players.dto';
import { PlayersService } from './players.service';

@Controller('players')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN)
  @Put('EditPlayer/:TeamID')
  public EditPlayer(
    @Body() Player: PlayerDto,
    @Param('TeamID') TeamID: string,
  ) {
    TeamID = TeamID.substring(1, TeamID.length);
    return this.PlayersService.EditPlayer(Player, parseInt(TeamID));
  }
  @Roles(Role.ADMIN)
  @Delete('DeletePlayer:PlayerID')
  public DeletePlayer(@Param('PlayerID') PlayerID: string) {
    PlayerID = PlayerID.substring(1, PlayerID.length);
    console.log();
    return this.PlayersService.DeletePlayer(parseInt(PlayerID));
  }
}
