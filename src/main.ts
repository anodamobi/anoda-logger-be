import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap () {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );


    app.enableCors({
        credentials: true,
        origin:      [
            'http://ec2-3-65-184-108.eu-central-1.compute.amazonaws.com',
            'http://localhost:3000',
        ],
    });
    await app.listen(process.env.PORT);
}
bootstrap();
