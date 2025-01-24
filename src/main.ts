import { NestFactory } from '@nestjs/core';
import { AppModule } from './Domain/Modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './Infrastructure/errors/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
