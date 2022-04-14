import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
    imports:     [LoggerModule, AuthModule, MongooseModule.forRoot('mongodb://localhost/logger')],
    controllers: [AppController],
    providers:   [AppService],
})
export class AppModule {}
