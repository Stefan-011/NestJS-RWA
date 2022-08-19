import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponzor } from './entities/sponzor.entities';
import { SponzorDto } from './dto/sponzor.dto';

@Injectable()
export class SponzorService {
    constructor(@InjectRepository(Sponzor) private sponzorRepo: Repository<Sponzor>){}

    GetAll()
    {
        return this.sponzorRepo.find()
    }

    GetByID(id:number)
    {
        return this.sponzorRepo.findOne({where:{id:id}})
    }

    async ADD(SponzorDto:SponzorDto)
    {
        const NewSponzor = new Sponzor()
        NewSponzor.img = SponzorDto.img;
        NewSponzor.money = SponzorDto.money;
        NewSponzor.name = SponzorDto.name;
        NewSponzor.MyTeam = [];

        return await this.sponzorRepo.save(NewSponzor)
    }
}
