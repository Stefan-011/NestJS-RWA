import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponzorService } from './sponzor.service';
import { Sponzor } from './entities/sponzor.entities';
import { SponzorController } from './sponzor.controller';



@Module({
  imports :[TypeOrmModule.forFeature([Sponzor])],
  providers: [SponzorService],
  controllers: [SponzorController]
})
export class SponzorModule {}
