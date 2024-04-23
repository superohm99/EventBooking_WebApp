import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        },
        {
            name: UserSettings.name,
            schema: UserSettingsSchema,
        }
    ]),
],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
