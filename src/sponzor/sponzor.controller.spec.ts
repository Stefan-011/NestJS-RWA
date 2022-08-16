import { Test, TestingModule } from '@nestjs/testing';
import { SponzorController } from './sponzor.controller';

describe('SponzorController', () => {
  let controller: SponzorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SponzorController],
    }).compile();

    controller = module.get<SponzorController>(SponzorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
