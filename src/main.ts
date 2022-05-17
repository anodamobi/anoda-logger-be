import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap () {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );

    const config = new DocumentBuilder()
        .setTitle('Logger example')
        .setDescription('The logger API description')
        .setVersion('1.0')
        .addTag('logger')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);


    app.enableCors({
        credentials: true,
        origin:      [
            'http://ec2-3-65-184-108.eu-central-1.compute.amazonaws.com:3002',
            'http://localhost:3000',
            'https://d1s413wgxi3ibq.cloudfront.net',
            'https://logger.anoda.mobi ',
        ],
    });
    await app.listen(process.env.PORT);
}
bootstrap();
