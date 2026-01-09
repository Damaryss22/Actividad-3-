import { Test, TestingModule } from '@nestjs/testing';
import { AtraccionService } from './atraccion.service';

describe('AtraccionService', () => {
  let service: AtraccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtraccionService],
    }).compile();

    service = module.get<AtraccionService>(AtraccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
