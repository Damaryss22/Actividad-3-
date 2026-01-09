import { Module } from '@nestjs/common';
import { HotelService } from './hoteles.service';
import { HotelResolver } from './hoteles.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HotelResolver, HotelService],
  exports: [HotelService]
})
export class HotelesModule {}
