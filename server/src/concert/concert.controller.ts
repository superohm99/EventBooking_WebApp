import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';


@Controller('concert')
export class ConcertController {

    @Get('getdata')
    Getdata(){
        return 'test getdata';
    }
}
