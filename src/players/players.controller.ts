import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { type } from 'os';
import { PlayerDto } from './dto/players.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {

    constructor(private PlayersService:PlayersService){}

    @Get('GetAllByTeam:Teamname')
    public GetAllByTeam(@Param("Teamname") Teamname:string)
    {
        Teamname = Teamname.substring(1,Teamname.length);
        return this.PlayersService.GetAllByTeam(Teamname);
    }

    @Post('ADD')
    public ADD(@Body() PlayerDto:PlayerDto)
    {
        return this.PlayersService.ADDTOTABLE(PlayerDto);
    }


    @Get('GetPlayerByID:id')
    public GetPlayerByID(@Param("id") id:string)
    {
        id = id.substring(1,id.length);
       return this.PlayersService.GetPlayerByID(parseInt(id))
    }

    
}
