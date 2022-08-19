import { Body, Controller, Get, Inject, NotFoundException, Param, Post , Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserModule } from './users.module';
import { UsersService } from './users.service';


@Controller('user')
export class UsersController {

    constructor(private readonly UserService:UsersService)
    {

    }
    @Post()
    public wat(@Body() UserDto: UserDto)
    {
        
         return this.UserService.TEST(UserDto);
    }
    @UseGuards(JwtAuthGuard)
    @Get('TEST')
    public w()
    {
        
         return this.UserService.FindUser("admin@gmail.com")
    }

    
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
