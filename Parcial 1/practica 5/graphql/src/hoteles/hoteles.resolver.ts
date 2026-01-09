import { Resolver, Query, Args } from '@nestjs/graphql';
import { HotelService } from './hoteles.service';
import { Hotele } from './entities/hotele.entity';

@Resolver(() => Hotele)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query(() => [Hotele], { name: 'hoteles' })
  findAll() {
    return this.hotelService.findAll();
  }

  @Query(() => Hotele, { name: 'hotel' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.hotelService.findOne(id);
  }
}
