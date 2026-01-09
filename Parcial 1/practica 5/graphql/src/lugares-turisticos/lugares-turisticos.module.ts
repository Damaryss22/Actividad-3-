import { Module } from '@nestjs/common';
import { LugaresTuristicosService } from './lugares-turisticos.service';
import { LugaresTuristicosResolver } from './lugares-turisticos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [LugaresTuristicosResolver, LugaresTuristicosService],
  exports: [LugaresTuristicosService]
})
export class LugaresTuristicosModule {}
