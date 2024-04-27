import { Module } from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { UserInfoController } from './user_info.controller';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService],
})
export class UserInfoModule {}
