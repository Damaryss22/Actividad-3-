import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaResolver } from './resena.resolver';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  providers: [ResenaResolver, ResenaService],
  exports: [ResenaService]
})
export class ResenaModule {}
