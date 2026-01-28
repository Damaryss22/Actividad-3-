import { Module } from '@nestjs/common';
import { WebhookEmitterService } from './webhook-emitter.service';

@Module({
  providers: [WebhookEmitterService],
  exports: [WebhookEmitterService],
})
export class WebhookModule {}
