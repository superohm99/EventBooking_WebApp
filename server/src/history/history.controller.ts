import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { jwtDecode } from 'jwt-decode';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get()
  findAll(@Req() req) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
      return [];
    }
    const token = authHeader.split(" ")[1];
    if(!token) {
      return [];
    }

    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    console.log(`userId: ${userId}`);
    console.log(`token: ${token}`);
    console.log(`typeof usrID: ${typeof userId}`);
    return this.historyService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
