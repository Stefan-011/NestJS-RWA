import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';


@Controller('user')
export class UsersController {

    constructor(private readonly UserService:UsersService){}
    
    @UseGuards(JwtAuthGuard)
    @Get('GetMyProfile')
    public GetMyProfile(@Request() req)
    {
        if(req)
        return this.UserService.FindMyProfile(req.user.email)
    }

    @UseGuards(JwtAuthGuard)
    @Get('SaveChanges:money')
    public SaveChanges(@Request() req,@Param('money') money:number)
    {
       return this.UserService.SaveChanges(req.user.id,money)
    }   
}
