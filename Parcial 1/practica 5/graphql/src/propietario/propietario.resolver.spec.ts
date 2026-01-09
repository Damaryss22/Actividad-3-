import { Test, TestingModule } from '@nestjs/testing';
import { PropietarioResolver } from './propietario.resolver';
import { PropietarioService } from './propietario.service';

describe('PropietarioResolver', () => {
  let resolver: PropietarioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropietarioResolver, PropietarioService],
    }).compile();

    resolver = module.get<PropietarioResolver>(PropietarioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
