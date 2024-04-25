import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';

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
        }
    ]),
],
  controllers: [UsersController],
  providers: [UsersService,AtStrategy,RtStrategy]
})
export class UsersModule {}
