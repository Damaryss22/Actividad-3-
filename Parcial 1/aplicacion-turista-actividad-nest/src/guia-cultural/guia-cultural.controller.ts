import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuiaCulturalService } from './guia-cultural.service';
import { CreateGuiaCulturalDto } from './dto/create-guia-cultural.dto';
import { UpdateGuiaCulturalDto } from './dto/update-guia-cultural.dto';

@Controller('guia-cultural')
export class GuiaCulturalController {
  constructor(private readonly guiaCulturalService: GuiaCulturalService) {}

  @Post()
  create(@Body() createGuiaCulturalDto: CreateGuiaCulturalDto) {
    return this.guiaCulturalService.create(createGuiaCulturalDto);
  }

  @Get()
  findAll() {
    return this.guiaCulturalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guiaCulturalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuiaCulturalDto: UpdateGuiaCulturalDto,
  ) {
    return this.guiaCulturalService.update(id, updateGuiaCulturalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guiaCulturalService.remove(id);
  }
}
