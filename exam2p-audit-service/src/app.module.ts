import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditModule } from './audit/audit.module';
import { Exam2AuditLog } from './audit/exam2-audit-log.entity';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'exam2-audit.db',
      entities: [Exam2AuditLog],
      synchronize: true, // ⚠️ EXAMEN: permitido
    }),
    AuditModule,
    WebhookModule,
  ],
})
export class AppModule {}
