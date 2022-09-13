import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/Enums/Role';
import { MyTeamDto } from './dto/MyTeamDto';
import { MyTeamService } from './my-team.service';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('my-team')
export class MyTeamController {
  constructor(private MyTeamService: MyTeamService) {}

  @Roles(Role.USER)
  @Get('GetMyTeam')
  async GetMyTm(@Request() req) {
    if (req) return this.MyTeamService.GetMyTeam(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Put('AddPlayer:id')
  async AddPlayer(@Request() req, @Param('id') id: string) {
    id = id.substring(1, id.length);
    if (req) return this.MyTeamService.AddPlayer(req.user.id, parseInt(id));
  }
  @Roles(Role.USER)
  @Delete('RemovePlayer:id')
  public RemovePlayer(@Request() req, @Param('id') id: string) {
    id = id.substring(1, id.length);
    if (req) return this.MyTeamService.RemovePlayer(req.user.id, parseInt(id));
  }
  @Roles(Role.USER)
  @Put('AddSponzor:id')
  public AddSponzor(@Request() req, @Param('id') id: string) {
    id = id.substring(1, id.length);
    if (req) return this.MyTeamService.AddSponzor(req.user.id, parseInt(id));
  }
  @Roles(Role.USER)
  @Put('RemoveSponzor')
  public RemoveSponzor(@Request() req) {
    if (req) return this.MyTeamService.RemoveSponzor(req.user.id);
  }
  @Roles(Role.ADMIN)
  @Post('CreateTeam')
  async CreateTeam(@Request() req, @Body() TeamDto: MyTeamDto) {
    return this.MyTeamService.CreateTeam(TeamDto, req.user.id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put('EditTeam')
  async EditTeam(@Body() TeamDto: MyTeamDto) {
    return this.MyTeamService.EditTeam(TeamDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete('DeleteTeam:id')
  async DeleteTeam(@Param('id') id: string) {
    id = id.substring(1, id.length);
    return this.MyTeamService.DeleteTeam(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('GetCreatedTeams')
  async GetCreatedTeams() {
    return this.MyTeamService.GetCreatedTeams();
  }
}
