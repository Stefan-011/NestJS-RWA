import { Controller, Get } from '@nestjs/common';

@Controller('players')
export class PlayersController {

    constructor(){}

    @Get()
    public Ts()
    {
        return "TestPl"
    }
}
