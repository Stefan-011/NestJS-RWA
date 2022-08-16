import { Test, TestingModule } from '@nestjs/testing';
import { SponzorService } from './sponzor.service';

describe('SponzorService', () => {
  let service: SponzorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SponzorService],
    }).compile();

    service = module.get<SponzorService>(SponzorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
