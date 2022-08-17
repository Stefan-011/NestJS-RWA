import { Body, Controller, Get, Inject, NotFoundException, Param, Post , Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserModule } from './users.module';
import { UsersService } from './users.service';


@Controller('user')
export class UsersController {

    constructor(private readonly userService:UsersService)
    {

    }
    @Post()
    public wat(@Body() UserDto: UserDto)
    {
        
         return this.userService.TEST(UserDto);
    }
    @UseGuards(JwtAuthGuard)
    @Get('TEST')
    public w()
    {
        
         return this.userService.FindUser("admin@gmail.com")
    }
    
    

    
}
