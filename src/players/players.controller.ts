import { Controller, Get, Param} from '@nestjs/common';
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

    @Get('GetPlayerByID:id')
    public GetPlayerByID(@Param("id") id:string)
    {
        id = id.substring(1,id.length);
       return this.PlayersService.GetPlayerByID(parseInt(id))
    }
 
}
