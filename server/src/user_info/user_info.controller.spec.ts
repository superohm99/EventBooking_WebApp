import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from './user_info.controller';
import { UserInfoService } from './user_info.service';

describe('UserInfoController', () => {
  let controller: UserInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInfoController],
      providers: [UserInfoService],
    }).compile();

    controller = module.get<UserInfoController>(UserInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
