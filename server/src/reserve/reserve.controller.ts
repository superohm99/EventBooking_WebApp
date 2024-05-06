import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { Public } from 'src/users/common/decorators/src/common/decorators';
import { Req } from '@nestjs/common';

@Public()
@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Get(':id')
  getdata_reserve(@Param('id') event_id:string){
      return this.reserveService.getReserveData(event_id);
  }
  
  @Post(':id/create_reserve')
  create_reserve(@Param('id') event_id:string, @Body() create_reserve: CreateReserveDto, @Req() req){
    console.log('req', req.headers.authorization)
    return this.reserveService.create_reserve(event_id, create_reserve, req);
  }

  @Post('get_reserve/:id')
  get_reserve(@Param('id') id: string, @Req() req){
    return this.reserveService.get_reserve_by_id(id);
  }

  @Post('get_reserve_by_user')
  get_reserve_by_user(@Req() req){
    return this.reserveService.getReserveByUser(req);
  }

}
