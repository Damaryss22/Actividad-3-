import { Module } from '@nestjs/common';
import { AtraccionService } from './atraccion.service';
import { AtraccionController } from './atraccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atraccion } from './entities/atraccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Atraccion])],
  controllers: [AtraccionController],
  providers: [AtraccionService],
  exports: [TypeOrmModule],
})
export class AtraccionModule {}
