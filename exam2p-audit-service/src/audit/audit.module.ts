import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { Exam2AuditLog } from './exam2-audit-log.entity';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam2AuditLog]),
    WebhookModule,
  ],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
