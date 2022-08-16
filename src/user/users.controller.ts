import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserModule } from './users.module';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(private readonly userService:UsersService)
    {

    }
    @Get()
    public wat()
    {
        let t = "test"
        return t;
    }


    
}
