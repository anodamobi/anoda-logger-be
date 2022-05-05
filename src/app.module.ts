import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [LoggerModule, AuthModule, ConfigModule.forRoot({
        isGlobal:    true,
        envFilePath: ['.env'],
        cache:       true,
    }),
    MongooseModule.forRoot(process.env.DATABASE, {
        useNewUrlParser: true,
        connectionName:  'data',
    }),
    ],

    controllers: [AppController],
    providers:   [AppService],
})
export class AppModule {}
