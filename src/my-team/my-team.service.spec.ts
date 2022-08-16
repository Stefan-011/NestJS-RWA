import { Test, TestingModule } from '@nestjs/testing';
import { MyTeamService } from './my-team.service';

describe('MyTeamService', () => {
  let service: MyTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyTeamService],
    }).compile();

    service = module.get<MyTeamService>(MyTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
