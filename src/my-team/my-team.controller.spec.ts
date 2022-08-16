import { Test, TestingModule } from '@nestjs/testing';
import { MyTeamController } from './my-team.controller';

describe('MyTeamController', () => {
  let controller: MyTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyTeamController],
    }).compile();

    controller = module.get<MyTeamController>(MyTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
