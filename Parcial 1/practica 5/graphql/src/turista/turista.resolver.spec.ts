import { Test, TestingModule } from '@nestjs/testing';
import { TuristaResolver } from './turista.resolver';
import { TuristaService } from './turista.service';

describe('TuristaResolver', () => {
  let resolver: TuristaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuristaResolver, TuristaService],
    }).compile();

    resolver = module.get<TuristaResolver>(TuristaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
