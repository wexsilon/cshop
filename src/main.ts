import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  const config = new DocumentBuilder()
    .setTitle('CShop example')
    .setDescription('The cshop api description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http' }, 'Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(
    configService.get<number>('APP_PORT'),
    configService.get<string>('APP_HOST'),
  );
}
bootstrap();
