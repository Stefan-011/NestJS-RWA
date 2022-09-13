import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { elementAt } from 'rxjs';
import { PanelErrorMessage } from 'src/Enums/PanelErrorMessage';
import { MyTeam } from 'src/my-team/entities/Myteam.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SponzorDto } from './dto/sponzor.dto';
import { Sponzor } from './entities/sponzor.entity';

@Injectable()
export class SponzorService {
  constructor(
    @InjectRepository(Sponzor) private sponzorRepo: Repository<Sponzor>,
    @InjectRepository(MyTeam) private MyTeamRepo: Repository<MyTeam>,
    @InjectRepository(User) private UserRepo: Repository<User>,
  ) {}

  async GetAll() {
    return await this.sponzorRepo.find();
  }

  async CreateSponzor(SponzorDto: SponzorDto) {
    const CheckSponzor = await this.sponzorRepo.findOne({
      where: { name: SponzorDto.name },
    });

    if (CheckSponzor)
      return {
        Server_response: PanelErrorMessage.SponzorAlreadyExists,
      };
    let NewSponzor = new Sponzor();
    NewSponzor.name = SponzorDto.name;
    NewSponzor.img = SponzorDto.img;
    NewSponzor.money = SponzorDto.money;

    if (NewSponzor.img == '')
      NewSponzor.img =
        'https://st2.depositphotos.com/2274151/6485/i/450/depositphotos_64853689-stock-photo-sponsor-vintage-turquoise-seal-isolated.jpg';
    await this.sponzorRepo.save(NewSponzor);
    return {
      Server_response: PanelErrorMessage.none,
    };
  }

  async DeleteSponzor(SponzorId: number) {
    const SponzorForDelete = await this.sponzorRepo.findOne({
      where: { id: SponzorId },
    });

    const Teams = await this.MyTeamRepo.find({
      where: { MySponzor: SponzorForDelete },
    });

    for (let Team of Teams) {
      let User = await this.UserRepo.findOne({ where: { MyTeam: Team } });
      if (User.money > SponzorForDelete.money)
        User.money = User.money - SponzorForDelete.money;
      else User.money = 0;
    }

    await this.sponzorRepo.remove(SponzorForDelete);

    return {
      Server_response: PanelErrorMessage.none,
    };
  }

  async EditSponzor(SponzorDto: SponzorDto) {
    const SponzorForEdit = await this.sponzorRepo.findOne({
      where: { id: SponzorDto.id },
    });
    SponzorForEdit.img = SponzorDto.img;
    SponzorForEdit.money = SponzorDto.money;
    SponzorForEdit.name = SponzorDto.name;
    if (SponzorForEdit.img == '')
      SponzorForEdit.img =
        'https://st2.depositphotos.com/2274151/6485/i/450/depositphotos_64853689-stock-photo-sponsor-vintage-turquoise-seal-isolated.jpg';

    await this.sponzorRepo.save(SponzorForEdit);

    return {
      Server_response: PanelErrorMessage.none,
    };
  }
}
