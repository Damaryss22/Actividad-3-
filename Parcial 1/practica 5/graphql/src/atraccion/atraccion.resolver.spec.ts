import { Test, TestingModule } from '@nestjs/testing';
import { AtraccionResolver } from './atraccion.resolver';
import { AtraccionService } from './atraccion.service';

describe('AtraccionResolver', () => {
  let resolver: AtraccionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtraccionResolver, AtraccionService],
    }).compile();

    resolver = module.get<AtraccionResolver>(AtraccionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
