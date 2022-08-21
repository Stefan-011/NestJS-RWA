import { Controller, Get } from '@nestjs/common';;
import { SponzorService } from './sponzor.service';

@Controller('sponzor')
export class SponzorController {

constructor(private SponzorService:SponzorService){}

    @Get('GetAll')
    public GetAll()
    {
        return this.SponzorService.GetAll();
    }

}
