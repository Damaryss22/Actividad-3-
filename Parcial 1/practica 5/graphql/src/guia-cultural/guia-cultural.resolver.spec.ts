import { Test, TestingModule } from '@nestjs/testing';
import { GuiaCulturalResolver } from './guia-cultural.resolver';
import { GuiaCulturalService } from './guia-cultural.service';

describe('GuiaCulturalResolver', () => {
  let resolver: GuiaCulturalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuiaCulturalResolver, GuiaCulturalService],
    }).compile();

    resolver = module.get<GuiaCulturalResolver>(GuiaCulturalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
