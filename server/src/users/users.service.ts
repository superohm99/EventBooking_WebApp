import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>
    ) {}

    async createUser({ settings, ...createUserDto}: CreateUserDto) {
        if (settings) {
            const newSettings = new this.userSettingsModel(settings);
            const savedNewSettings = await newSettings.save()
            const newUser = new this.userModel({
                ...createUserDto,
                settings: savedNewSettings._id,
            });
            return newUser.save();
        }
        const newUser = new this.userModel(createUserDto)
        return newUser.save();
    }

    deleteUser(id: string){
        return this.userModel.findByIdAndDelete(id)
    }

    
}