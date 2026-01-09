import { Module } from '@nestjs/common';
import { AtraccionService } from './atraccion.service';
import { AtraccionResolver } from './atraccion.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AtraccionResolver, AtraccionService],
  exports: [AtraccionService]
})
export class AtraccionModule {}
