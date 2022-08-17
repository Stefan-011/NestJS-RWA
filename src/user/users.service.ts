import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private UserRepo: Repository<User>)
    {}

    async CreateUser(UserDto:UserDto)//:Promise<UserDto | undefined>
    {
        const {username, password, email } = UserDto

        if(username.length == 0 || password.length == 0|| email.length == 0)
        throw new Error("Nisu dostupni svi podaci!");

        if(await this.UserRepo.findOne({where:{email}}) || await this.UserRepo.findOne({where:{username}}))
        throw new Error("Uneseni podaci se vec koriste!");
  
    }

    async TEST(@Body() UserDto: UserDto)
    {
      const user = new User();
      user.email = UserDto.email
      user.username = UserDto.username;
      user.password = UserDto.password;
      user.money = 5000;
      return this.UserRepo.save(user);
    }

    async FindUser(email: string): Promise<User | undefined> {
      let user: User = await this.UserRepo.findOne({where: { email:email }});

      if (!user || !user.id) 
          throw new Error('Korisnik nije pronadjen');
      
      return user;
  }

  
}
