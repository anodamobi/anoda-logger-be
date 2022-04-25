import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
    imports: [LoggerModule, UserModule, AuthModule, ConfigModule.forRoot({
        isGlobal:    true,
        envFilePath: ['.env'],
        cache:       true,
    }), MongooseModule.forRoot(process.env.DATABASE)],

    controllers: [AppController],
    providers:   [AppService],
})
export class AppModule {}
