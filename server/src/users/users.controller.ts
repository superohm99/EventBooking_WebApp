import { Body, Controller, Delete, HttpException, Param, Post, Req, UseGuards, UsePipes, ValidationPipe, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/User.dto';
import { LoginDto } from './dto/User.dto';
import { CreateUserInfoDto } from './dto/User.dto';
import mongoose, { Types } from 'mongoose';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators/src/common/decorators';
import { RtGuard } from './common/guards';
import { Tokens } from './types';
import { Type } from 'class-transformer';
import { UpdateUserInfoDto } from './dto/User.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Public()
    @Post('register')
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Public()
    @Post('login')
    login(@Body() LoginDto: LoginDto){
        console.log(LoginDto);
        return this.usersService.login(LoginDto);
    }

    @Post('logout')
    async logout(@GetCurrentUserId() userId: Types.ObjectId): Promise<boolean> {
        console.log(userId)
        console.log(typeof(userId))
        return await this.usersService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    refreshTokens(
        @GetCurrentUserId() userId: Types.ObjectId,
        @GetCurrentUser('refreshToken') refreshToken: string,
      ): Promise<Tokens> {
        return this.usersService.refreshTokens(userId, refreshToken);
      }


    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400)
        const deletedUser = await this.usersService.deleteUser(id)
        if (!deletedUser) throw new HttpException('User not Found',404)
        console.log(deletedUser)
    }

    //UserInfo
    @Post('user_info')
    create_user_info(@Body() UserInfoDto: CreateUserInfoDto){
        return this.usersService.createUserInfo(UserInfoDto);
    }

    //Get user_info detail
    // Route to get User_info with associated User details
    @Get('user_info/:id')
    getUserInfoWithUserDetails(@Param('id') id: string) {
    return this.usersService.getUserInfoWithUserDetails(id);
    }

    //EdituserInfo
    @Patch('user_info/:user_id')
    async updateUser(@Param('user_id') user_id: string, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.usersService.updateUserInfo(user_id, updateUserInfoDto);
    }

   
}