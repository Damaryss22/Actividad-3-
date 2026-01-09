import { Module } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { PropietarioResolver } from './propietario.resolver';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  providers: [PropietarioResolver, PropietarioService],
  exports: [PropietarioService]
})
export class PropietarioModule {}
