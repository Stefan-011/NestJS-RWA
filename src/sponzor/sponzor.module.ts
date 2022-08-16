import { Module } from '@nestjs/common';
import { SponzorService } from './sponzor.service';
import { SponzorController } from './sponzor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponzor } from './entities/sponzor.entities';

@Module({
  imports :[TypeOrmModule.forFeature([Sponzor])],
  providers: [SponzorService],
  controllers: [SponzorController]
})
export class SponzorModule {}
