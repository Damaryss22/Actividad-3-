import { Module } from '@nestjs/common';
import { GuiaCulturalService } from './guia-cultural.service';
import { GuiaCulturalResolver } from './guia-cultural.resolver';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports:[HttpModule],
  providers: [GuiaCulturalResolver, GuiaCulturalService],
  exports:[GuiaCulturalService]
})
export class GuiaCulturalModule {}
