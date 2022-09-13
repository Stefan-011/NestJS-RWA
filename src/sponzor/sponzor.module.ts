import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponzorService } from './sponzor.service';
import { Sponzor } from './entities/sponzor.entity';
import { SponzorController } from './sponzor.controller';
import { MyTeam } from 'src/my-team/entities/Myteam.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sponzor]),
    TypeOrmModule.forFeature([MyTeam]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [SponzorService],
  controllers: [SponzorController],
})
export class SponzorModule {}
