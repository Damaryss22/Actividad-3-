"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'exam2p_auditoria_queue',
            queueOptions: {
                durable: true,
            },
            noAck: false,
            deserializer: {
                deserialize: (value) => {
                    let data = value;
                    if (Buffer.isBuffer(value)) {
                        data = JSON.parse(value.toString());
                    }
                    else if (typeof value === 'string') {
                        data = JSON.parse(value);
                    }
                    return {
                        pattern: 'exam2p.record.deleted',
                        data: data,
                    };
                },
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(3001);
    console.log('🚀 Auditoría HTTP en http://localhost:3001');
}
bootstrap();
//# sourceMappingURL=main.js.map