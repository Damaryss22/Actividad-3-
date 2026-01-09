import { Module } from '@nestjs/common';
import { TuristaService } from './turista.service';
import { TuristaResolver } from './turista.resolver';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  providers: [TuristaResolver, TuristaService],
  exports: [TuristaService]
})
export class TuristaModule {} 
