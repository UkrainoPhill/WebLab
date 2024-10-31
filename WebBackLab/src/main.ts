import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from "./SwaggerConfig";
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors();
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
