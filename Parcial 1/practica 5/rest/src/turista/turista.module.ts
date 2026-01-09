import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TuristaService } from './turista.service';
import { TuristaController } from './turista.controller';
import { Turista } from './entities/turista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turista])],
  controllers: [TuristaController],
  providers: [TuristaService],
  exports: [TypeOrmModule],
})
export class TuristaModule {}
