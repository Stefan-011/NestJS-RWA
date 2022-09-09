import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SponzorDto } from './dto/sponzor.dto';
import { SponzorService } from './sponzor.service';

@Controller('sponzor')
export class SponzorController {
  constructor(private SponzorService: SponzorService) {}

  @UseGuards(JwtAuthGuard)
  @Get('GetAll')
  public GetAll() {
    return this.SponzorService.GetAll();
  }
  @UseGuards(JwtAuthGuard)
  @Post('CreateSponzor')
  public CreateSponzor(@Body() SponzorDto: SponzorDto) {
    return this.SponzorService.CreateSponzor(SponzorDto);
  }
}
