import { Module } from '@nestjs/common';
import { GuiaCulturalService } from '../guia-cultural/guia-cultural.service';
import { GuiaCulturalController } from './guia-cultural.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuiaCultural } from './entities/guia-cultural.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuiaCultural])],
  controllers: [GuiaCulturalController],
  providers: [GuiaCulturalService],
  exports: [TypeOrmModule],
})
export class GuiaCulturalModule {}
