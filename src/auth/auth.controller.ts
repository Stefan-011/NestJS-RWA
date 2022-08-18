import { Injectable, UseGuards } from "@nestjs/common";
import { Body, Controller, Get, Inject, NotFoundException, Param, Post , Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from "src/user/entities/user.entity";
import { LocalAuthGuard } from "./local-auth.guard";
import { UserDto } from 'src/user/dto/user.dto'
import { LocalStrategy } from "./local.strategy";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Controller('auth')
export class AuthController {

    constructor(private AuthService:AuthService,){}//private LS:LocalStrategy

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req)
    {   
       return this.AuthService.login(req.user);
    }

    
    @Post('register')
    async register(@Body() UserDto: UserDto)
    {   
       return this.AuthService.register(UserDto);
    }

  
    @UseGuards(JwtAuthGuard)
    @Get('TEST')
    async test()
    {
      //  return this.LS.validate("admin@gmail.com","admin");
        return this.AuthService.validateUser("admin@gmail.com","admin")
    }

  
    @Get('sifra')
    async z(@Body() pass:string)
    {
     return this.AuthService.Test(pass);
      //  return this.LS.validate("admin@gmail.com","admin");
        //return this.AuthService.validateUser("admin@gmail.com","admin")
    }
}


