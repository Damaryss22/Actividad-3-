import { Test, TestingModule } from '@nestjs/testing';
import { MedioTransporteService } from './medio-transporte.service';

describe('MedioTransporteService', () => {
  let service: MedioTransporteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedioTransporteService],
    }).compile();

    service = module.get<MedioTransporteService>(MedioTransporteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
