import { Body, Controller, Delete, HttpException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/User.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto);
        return this.usersService.createUser(createUserDto)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400)
        const deletedUser = await this.usersService.deleteUser(id)
        if (!deletedUser) throw new HttpException('User not Found',404)
        console.log(deletedUser)
    }
}