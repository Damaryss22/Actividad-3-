import { Test, TestingModule } from '@nestjs/testing';
import { RestauranteResolver } from './restaurante.resolver';
import { RestauranteService } from './restaurante.service';

describe('RestauranteResolver', () => {
  let resolver: RestauranteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestauranteResolver, RestauranteService],
    }).compile();

    resolver = module.get<RestauranteResolver>(RestauranteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
