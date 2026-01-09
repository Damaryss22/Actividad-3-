import { Test, TestingModule } from '@nestjs/testing';
import { HotelResolver } from './hoteles.resolver';
import { HotelService } from './hoteles.service';

describe('HotelesResolver', () => {
  let resolver: HotelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelResolver, HotelService],
    }).compile();

    resolver = module.get<HotelResolver>(HotelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
