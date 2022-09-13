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
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/Enums/Role';
import { SponzorDto } from './dto/sponzor.dto';
import { SponzorService } from './sponzor.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sponzor')
export class SponzorController {
  constructor(private SponzorService: SponzorService) {}

  @Get('GetAll')
  public GetAll() {
    return this.SponzorService.GetAll();
  }

  @Roles(Role.ADMIN)
  @Post('CreateSponzor')
  public CreateSponzor(@Body() SponzorDto: SponzorDto) {
    return this.SponzorService.CreateSponzor(SponzorDto);
  }

  @Roles(Role.ADMIN)
  @Delete('DeleteSponzor/:id')
  public DeleteSponzor(@Param('id') id: string) {
    id = id.substring(1, id.length);
    return this.SponzorService.DeleteSponzor(parseInt(id));
  }

  @Roles(Role.ADMIN)
  @Put('EditSponzor')
  public EditSponzor(@Body() SponzorDto: SponzorDto) {
    return this.SponzorService.EditSponzor(SponzorDto);
  }
}
