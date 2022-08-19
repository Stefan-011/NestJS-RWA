import { Body, Controller, Get } from '@nestjs/common';
import { SponzorDto } from './dto/sponzor.dto';
import { SponzorService } from './sponzor.service';

@Controller('sponzor')
export class SponzorController {

constructor(private SponzorService:SponzorService){}

    @Get('ADD')
    public ADD(@Body() SponzorDto:SponzorDto)
    {
        return this.SponzorService.ADD(SponzorDto);
    }

    @Get('GetAll')
    public GetAll()
    {
        return this.SponzorService.GetAll();
    }

}
