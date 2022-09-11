import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Delete('DeleteSponzor/:id')
  public DeleteSponzor(@Param('id') id: string) {
    id = id.substring(1, id.length);
    return this.SponzorService.DeleteSponzor(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put('EditSponzor')
  public EditSponzor(@Body() SponzorDto: SponzorDto) {
    return this.SponzorService.EditSponzor(SponzorDto);
  }
}
