import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private UserService:UsersService,private jwtService:JwtService ) {
        
    }

    async validateUser(email:string , password:string) //radi
    {
        const user = await this.UserService.FindUser(email)
        
        if(user && user.password == password)
       {
        const {password, ...rest} = user;
        return rest;
       }

       return null;
    }

    async login(user:User)
    {
        const payload = {email:user.email , sub:user.id}
        return {
            access_token: this.jwtService.sign(payload,{ secret: 'SECRET' }), //ZAMENI
        }
    }

    
}
