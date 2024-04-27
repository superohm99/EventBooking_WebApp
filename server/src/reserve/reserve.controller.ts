import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reserveService.create(createReserveDto);
  }

  @Get()
  findAll() {
    return this.reserveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReserveDto: UpdateReserveDto) {
    return this.reserveService.update(+id, updateReserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveService.remove(+id);
  }
}
