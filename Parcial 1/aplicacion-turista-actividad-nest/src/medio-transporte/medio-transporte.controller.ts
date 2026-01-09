import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedioTransporteService } from './medio-transporte.service';
import { CreateMedioTransporteDto } from './dto/create-medio-transporte.dto';
import { UpdateMedioTransporteDto } from './dto/update-medio-transporte.dto';

@Controller('medio-transporte')
export class MedioTransporteController {
  constructor(
    private readonly medioTransporteService: MedioTransporteService,
  ) {}

  @Post()
  create(@Body() createMedioTransporteDto: CreateMedioTransporteDto) {
    return this.medioTransporteService.create(createMedioTransporteDto);
  }

  @Get()
  findAll() {
    return this.medioTransporteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medioTransporteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedioTransporteDto: UpdateMedioTransporteDto,
  ) {
    return this.medioTransporteService.update(id, updateMedioTransporteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medioTransporteService.remove(id);
  }
}
