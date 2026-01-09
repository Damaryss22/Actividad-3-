import { Test, TestingModule } from '@nestjs/testing';
import { MedioTransporteResolver } from './medio-transporte.resolver';
import { MedioTransporteService } from './medio-transporte.service';

describe('MedioTransporteResolver', () => {
  let resolver: MedioTransporteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedioTransporteResolver, MedioTransporteService],
    }).compile();

    resolver = module.get<MedioTransporteResolver>(MedioTransporteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
