import { Controller, Get, UseGuards,Request, Param, Post, Delete } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PlayerDto } from 'src/players/dto/players.dto';
import { MyTeamService } from './my-team.service';

@Controller('my-team')
export class MyTeamController {
    
    constructor(private MyTeamService:MyTeamService){}


    @UseGuards(JwtAuthGuard)
    @Get('GetMyTeam')
    async GetMyTm(@Request() req)
    {
        if(req)
        return this.MyTeamService.GetMyTeam(req.user.id)      
    }
    @UseGuards(JwtAuthGuard)
    @Get('AddPlayer:id')
    async AddPlayer(@Request() req , @Param('id') id:string)
    {
        id = id.substring(1,id.length)
        if(req)
        return this.MyTeamService.AddPlayer(req.user.id,parseInt(id))      
    }

    @UseGuards(JwtAuthGuard)
    @Delete('RemovePlayer:id')
    public RemovePlayer(@Request() req , @Param('id') id:string)
    {
        id = id.substring(1,id.length)
        if(req)
        return this.MyTeamService.RemovePlayer(req.user.id,parseInt(id))      
    }


    @UseGuards(JwtAuthGuard)
    @Get("AddSponzor:id")
    public AddSponzor(@Request() req , @Param('id') id:string)
    {
        id = id.substring(1,id.length)
        if(req)
        return this.MyTeamService.AddSponzor(req.user.id,parseInt(id)) 
    }

    @UseGuards(JwtAuthGuard)
    @Get("RemoveSponzor")
    public RemoveSponzor(@Request() req)
    {
        if(req)
        return this.MyTeamService.RemoveSponzor(req.user.id) 
    }


}
