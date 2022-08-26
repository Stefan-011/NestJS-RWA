import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}
   
async CreateUser(UserDto:UserDto)
    {
        const {username, password, email } = UserDto
       
        if(username.length == 0 || password.length == 0|| email.length == 0)
        throw new Error("Nisu dostupni svi podaci!");

        if(await this.UserRepo.findOne({where:{email}}) || await this.UserRepo.findOne({where:{username}}))
        throw new Error("Uneseni podaci se vec koriste!");

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(UserDto.password, salt);

        const NewUser = new User();
        NewUser.username = username;
        NewUser.email = email
        NewUser.password = hash;
        NewUser.money = 6000;
        return await this.UserRepo.save(NewUser);   
    }


async FindUser(email: string): Promise<User | undefined> 
    {
      let user: User = await this.UserRepo.findOne({where: { email:email }});

      if (!user || !user.id) 
        throw new Error('Korisnik nije pronadjen');    

        return user;
    }

async FindMyProfile(email: string) 
  {
     const {password , ... data}= await this.FindUser(email);
     return data;
  }


async SaveChanges(id:number,money:number)
{
    money = parseInt((money+"").substring(1,(money+"").length));
    const USER = await this.UserRepo.findOne({where:{id:id}})
    USER.money = money;
    return await this.UserRepo.save(USER);
}

}
