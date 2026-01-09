import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TuristaService } from './turista.service';
import { CreateTuristaDto } from './dto/create-turista.dto';
import { UpdateTuristaDto } from './dto/update-turista.dto';

@Controller('turista')
export class TuristaController {
  constructor(private readonly turistaService: TuristaService) {}

  @Post()
  create(@Body() createTuristaDto: CreateTuristaDto) {
    return this.turistaService.create(createTuristaDto);
  }

  @Get()
  findAll() {
    return this.turistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turistaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTuristaDto: UpdateTuristaDto) {
    return this.turistaService.update(id, updateTuristaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turistaService.remove(id);
  }
}
