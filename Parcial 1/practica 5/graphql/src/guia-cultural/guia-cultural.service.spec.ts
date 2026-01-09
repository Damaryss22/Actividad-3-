import { Test, TestingModule } from '@nestjs/testing';
import { GuiaCulturalService } from './guia-cultural.service';

describe('GuiaCulturalService', () => {
  let service: GuiaCulturalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuiaCulturalService],
    }).compile();

    service = module.get<GuiaCulturalService>(GuiaCulturalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
