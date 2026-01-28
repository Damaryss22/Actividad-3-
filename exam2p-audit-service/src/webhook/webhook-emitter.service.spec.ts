import { Test, TestingModule } from '@nestjs/testing';
import { WebhookEmitterService } from './webhook-emitter.service';

describe('WebhookEmitterService', () => {
  let service: WebhookEmitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookEmitterService],
    }).compile();

    service = module.get<WebhookEmitterService>(WebhookEmitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
