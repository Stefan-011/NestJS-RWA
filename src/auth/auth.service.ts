import { MyTeamService } from 'src/my-team/my-team.service';
import { UsersService } from 'src/user/users.service';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { JWTConst } from './model/JWTConst';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        private UserService:UsersService,
        private jwtService:JwtService, 
        private MyTeamService:MyTeamService 
        ) {}

    async validateUser(email:string , passwrd:string)
    {
        const user = await this.UserService.FindUser(email);
        if(!user && !user.password)
           throw new Error('Korisnik nije pronadjen.');

       if(!await bcrypt.compare(passwrd, user.password))
          throw new Error('Uneli ste pogresnu sifru.');

         const {password, ...rest} = user;
         return rest;
    }

    async login(user:User)
    {
        const payload = {email:user.email, sub:user.id};
        const  {email, ... data} = user;
        return {
            data,
            access_token: this.jwtService.sign( payload, { secret: JWTConst.secret } ), 
        }
    }

    async register(UserDto: UserDto)
    {
        if(!UserDto)
        throw Error("Podaci nisu validni")

        const { password, ...rest } = await this.UserService.CreateUser(UserDto);   
        await this.MyTeamService.CreateMyTeam(rest.id);
        return true;    
    }   
}
