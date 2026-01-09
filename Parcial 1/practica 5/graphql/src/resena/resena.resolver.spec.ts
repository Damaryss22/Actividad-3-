import { Test, TestingModule } from '@nestjs/testing';
import { ResenaResolver } from './resena.resolver';
import { ResenaService } from './resena.service';

describe('ResenaResolver', () => {
  let resolver: ResenaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResenaResolver, ResenaService],
    }).compile();

    resolver = module.get<ResenaResolver>(ResenaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
