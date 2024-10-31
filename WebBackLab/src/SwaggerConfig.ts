import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Explore Documentation')
        .setDescription('Explore is web lab backend for nulp, written by student of IoT-21 Romanchak Danylo')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}