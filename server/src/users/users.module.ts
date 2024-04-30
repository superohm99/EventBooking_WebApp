import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';
import { User_infoSchema} from 'src/schemas/User_info.schema';
import { User_info } from 'src/schemas/User_info.schema';
@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({}),
    MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        },
        {
            name: UserSettings.name,
            schema: UserSettingsSchema,
        },
        {
            name: User_info.name,
            schema: User_infoSchema,
        }


    ]),
],
  controllers: [UsersController],
  providers: [UsersService,AtStrategy,RtStrategy]
})
export class UsersModule {}
