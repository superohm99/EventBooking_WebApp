import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto} from './dto/User.dto';
import { LoginDto } from './dto/User.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response } from '@nestjs/common';
import { Request, response } from 'express';
import { JwtPayload, Tokens } from './types';
import generateUniqueId from 'generate-unique-id';
import { CreateUserInfoDto } from './dto/User.dto';
import { User_info } from 'src/schemas/User_info.schema';
import { UpdateUserInfoDto } from './dto/User.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,

        @InjectModel(User_info.name) private userInfoModel: Model<User_info>,

        private jwtService: JwtService,
    ) {}

    async getTokens(userId: Types.ObjectId, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
          sub: userId,
          email: email,
        };
    
        const [at, rt] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: 'at-secret',
            expiresIn: '15s',
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret: 'rt-secret',
            expiresIn: '7d',
          }),
        ]);
    
        return {
          access_token: at,
          refresh_token: rt,
        };
      }

    async createUser({ settings, ...createUserDto}: CreateUserDto): Promise<Tokens> {
        // if (settings) {
          console.log("asf")
            const hashpass = await bcrypt.hash(createUserDto.password, 10)
            const newSettings = new this.userSettingsModel(settings);
            const savedNewSettings = await newSettings.save()
            const newUser = new this.userModel({
                // id:generateUniqueId(),
                username:createUserDto.username,
                email:createUserDto.email,
                password:hashpass,
                settings: savedNewSettings._id,
            });
            newUser.save()
            const tokens = await this.getTokens(newUser._id,newUser.email);
            
            await this.updateRtHash(newUser._id, tokens.refresh_token);

            // const token = this.jwtService.sign({id : newUser.settings},{});
            // return tokens and newUser._id;
            return tokens;

        // }
        // const newUser = new this.userModel(createUserDto)
        // return newUser.save();
    }

    async login(LoginDto : LoginDto) : Promise<Tokens>{
      const { email, password } = LoginDto;

      const user = await this.userModel.findOne({ email });

      if (!user) {
      throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
      }

      const tokens = await this.getTokens(user._id, user.email);
      await this.updateRtHash(user._id, tokens.refresh_token);

      console.log("complete login")

      return tokens;
    }

    async refreshTokens(userId: Types.ObjectId, rt: string ): Promise<Tokens> {
        const user = await this.userModel.findById(
            userId
        );
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');
    
        const rtMatches = await bcrypt.compare(user.hashedRt.toString(), rt);
        if (!rtMatches) throw new ForbiddenException('Access Denied');
    
        const tokens = await this.getTokens(user._id, user.email);
        await this.updateRtHash(user._id, tokens.refresh_token);
    
        return tokens;
    }

    async updateRtHash(userId: Types.ObjectId, rt: string): Promise<void> {
        const hash = await bcrypt.hash(rt,10);
        try {
          await this.userModel.findByIdAndUpdate(userId, { hashedRt: hash });
          console.log('อัปเดตข้อมูลเรียบร้อยแล้ว');
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการอัปเดต:', error);
          throw error;
        }
    }

    async logout(userId): Promise<boolean> {
      if (userId) {
        try {
          const filter = { _id: userId };
          await this.userModel.updateMany(filter, { $set: { hashedRt: null } }).exec();
          console.log('Users updated successfully.');
          return true;
        } catch (error) {
          console.error('Error updating users:', error);
        }
      } else {
        return false;
      }
    }

    deleteUser(id: string){
        return this.userModel.findByIdAndDelete(id)
    }

    //user_info
    async createUserInfo(UserInfoDto: CreateUserInfoDto){
      const new_userInfo = new this.userInfoModel({
        date_of_birth: UserInfoDto.date_of_birth,
        id_card: UserInfoDto.id_card,
        gender: UserInfoDto.gender,
        phone_no: UserInfoDto.phone_no,
        address: UserInfoDto.address,
        country: UserInfoDto.country,
        province: UserInfoDto.province,
        district: UserInfoDto.district,
        postal_code: UserInfoDto.postal_code,
        user:  UserInfoDto.user_id
      })
      const test = await new_userInfo.populate('user');
      console.log(test)
      return new_userInfo.save()
    }

    //get_userinfo
    async getUserInfoWithUserDetails(user_id: string): Promise<User_info> {
      const userInfo = await this.userInfoModel.findOne({ user: user_id }).populate('user').exec();
      // console.log('User_info:', userInfo);
      return userInfo;
    }

    //update_userinfo
    async updateUserInfo(user_id: string, updateUserInfoDto: UpdateUserInfoDto): Promise<User_info> {  

      const update_username = await this.userModel.findByIdAndUpdate(
        user_id,
        { username: updateUserInfoDto.username},
        {new: true},
      ).exec();
      console.log('username_update',update_username);

      const updatedUserInfo = await this.userInfoModel.findOneAndUpdate(
        { user: user_id },
        updateUserInfoDto,
        { new: true }
      ).populate('user').exec();
      
      console.log('new_User_info:',updateUserInfoDto);
      return updatedUserInfo;
    }
    
}