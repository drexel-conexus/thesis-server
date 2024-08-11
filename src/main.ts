import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('')
    .setDescription(
      'This is a simple API to demonstrate how to use Swagger with NestJS',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Use your Swagger module's method
  SwaggerModule.setup('api', app, document); // Serve Swagger UI at /api

  await app.listen(8080);
}
bootstrap();
