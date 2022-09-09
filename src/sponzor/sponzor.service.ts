import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PanelErrorMessage } from 'src/Enums/PanelErrorMessage';
import { Repository } from 'typeorm';
import { SponzorDto } from './dto/sponzor.dto';
import { Sponzor } from './entities/sponzor.entity';

@Injectable()
export class SponzorService {
  constructor(
    @InjectRepository(Sponzor) private sponzorRepo: Repository<Sponzor>,
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
    await this.sponzorRepo.save(NewSponzor);
    return {
      Server_response: PanelErrorMessage.none,
    };
  }
}
