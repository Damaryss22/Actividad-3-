import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 🟢 Crear app HTTP
  const app = await NestFactory.create(AppModule);

  // 🟢 Conectar RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'exam2p_auditoria_queue',
      queueOptions: {
        durable: true,
      },
      noAck: false,
      deserializer: {
        deserialize: (value: any) => {
          let data = value;

          if (Buffer.isBuffer(value)) {
            data = JSON.parse(value.toString());
          } else if (typeof value === 'string') {
            data = JSON.parse(value);
          }

          return {
            pattern: 'exam2p.record.deleted', // 👈 EXACTO DEL EXAMEN
            data: data,
          };
        },
      },
    },
  });

  await app.startAllMicroservices();

  // 🟢 PUERTO HTTP (IMPORTANTE)
  await app.listen(3001);
  console.log('🚀 Auditoría HTTP en http://localhost:3001');
}

bootstrap();
