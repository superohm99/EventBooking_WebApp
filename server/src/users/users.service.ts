import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';
import { LoginDto } from './dto/User.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload, Tokens } from './types';
import generateUniqueId from 'generate-unique-id';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
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
        await this.updateRtHash(user.id, tokens.refresh_token);

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
    
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
    
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

    async logout(userId: Types.ObjectId): Promise<boolean>{
        await this.userModel.updateMany({
            where: {
              id: userId,
              hashedRt: {
                not: null,
              },
            },
            data: {
              hashedRt: null,
            },
          });

          return true;
    }


    deleteUser(id: string){
        return this.userModel.findByIdAndDelete(id)
    }

    
}