import { Test, TestingModule } from '@nestjs/testing';
import { AdministradorResolver } from './administrador.resolver';
import { AdministradorService } from './administrador.service';

describe('AdministradorResolver', () => {
  let resolver: AdministradorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministradorResolver, AdministradorService],
    }).compile();

    resolver = module.get<AdministradorResolver>(AdministradorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
