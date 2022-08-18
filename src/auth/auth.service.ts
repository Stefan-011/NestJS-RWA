import { Body, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserDto } from 'src/user/dto/user.dto';
import { MyTeamService } from 'src/my-team/my-team.service';
@Injectable()
export class AuthService {

    constructor(private UserService:UsersService,private jwtService:JwtService, private MyTeamService:MyTeamService ) {
        
    }

    async validateUser(email:string , passwrd:string) //radi
    {
        console.log(email)
        const user = await this.UserService.FindUser(email)
        console.log(user.money)
        if(!user && !user.password)
       throw new Error('Korisnik nije pronadjen.');

       if(!await bcrypt.compare(passwrd, user.password))
       throw new Error('Uneli ste pogresnu sifru.');

       const {password, ...rest} = user;
       return rest;
    
    }

    async login(user:User)
    {
        const payload = {email:user.email , sub:user.id}
      const  {email, ... data} = user
        return {
            data,
            access_token: this.jwtService.sign(payload,{ secret: 'SECRET' }), //ZAMENI
        }
    }

    async register(UserDto: UserDto)
    {
        if(!UserDto)
        throw Error("Podaci nisu validni")

        const { password, ...rest } = await this.UserService.CreateUser(UserDto);
       
        const payload = { username: rest.username, sub: rest.id };
        await this.MyTeamService.CreateMyTeam(rest.id)
        return true;
        
    }

    

    async Test(sifra:string)
    {
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash("test", salt);
        console.log(await bcrypt.compare("test",hash))
        return hash
        //let t = "test";
    }

    
}
