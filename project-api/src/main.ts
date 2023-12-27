import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SocketIoConfig } from './webSocketAdapeter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Project example')
    .setDescription('The Project API description')
    .setVersion('1.0')
    .addTag('Project')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Replace with your client's origin
    methods: ['GET', 'POST'], // Add methods you want to allow
    allowedHeaders: ['Content-Type', 'Authorization'], // Add headers you want to allow
    credentials: true, // Allow credentials (if needed)
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
