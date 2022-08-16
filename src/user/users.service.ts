import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>)
    {}

    async CreateUser(UserDto:UserDto)//:Promise<UserDto | undefined>
    {
        const {username, password, email } = UserDto

        if(username.length == 0 || password.length == 0|| email.length == 0)
        throw new Error("Nisu dostupni svi podaci!");

        if(await this.userRepo.findOne({where:{email}}) || await this.userRepo.findOne({where:{username}}))
        throw new Error("Uneseni podaci se vec koriste!");
  
    }

    async TEST(email)
    {
      //  return this.userRepo.findOne({where:{email}})
      return email;
    }
}
