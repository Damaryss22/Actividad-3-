import { Test, TestingModule } from '@nestjs/testing';
import { LugaresTuristicosResolver } from './lugares-turisticos.resolver';
import { LugaresTuristicosService } from './lugares-turisticos.service';

describe('LugaresTuristicosResolver', () => {
  let resolver: LugaresTuristicosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LugaresTuristicosResolver, LugaresTuristicosService],
    }).compile();

    resolver = module.get<LugaresTuristicosResolver>(LugaresTuristicosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
