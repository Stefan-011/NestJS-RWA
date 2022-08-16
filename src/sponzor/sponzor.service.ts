import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponzor } from './entities/sponzor.entities';

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
}
