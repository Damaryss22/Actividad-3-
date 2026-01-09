import { Module } from '@nestjs/common';
import { PropietariosService } from './propietario.service';
import { PropietarioController } from './propietario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propietario } from './entities/propietario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Propietario])],
  controllers: [PropietarioController],
  providers: [PropietariosService],
  exports: [TypeOrmModule],
})
export class PropietarioModule {}
