import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtraccionService } from './atraccion.service';
import { CreateAtraccionDto } from './dto/create-atraccion.dto';
import { UpdateAtraccionDto } from './dto/update-atraccion.dto';

@Controller('atraccion')
export class AtraccionController {
  constructor(private readonly atraccionService: AtraccionService) {}

  @Post()
  create(@Body() createAtraccionDto: CreateAtraccionDto) {
    return this.atraccionService.create(createAtraccionDto);
  }

  @Get()
  findAll() {
    return this.atraccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atraccionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAtraccionDto: UpdateAtraccionDto,
  ) {
    return this.atraccionService.update(id, updateAtraccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atraccionService.remove(id);
  }
}
