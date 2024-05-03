import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { Public } from 'src/users/common/decorators/src/common/decorators';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Public()
  @Get(':id')
  getdata_reserve(@Param('id') id:string){
      return this.reserveService.getdata_reserve(id);
  }
  
  @Public()
  @Post('create_reserve')
  create_reserve(@Body() create_reserve:CreateReserveDto){
    return this.reserveService.create_reserve(create_reserve);
  }


  
}
