import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { LoggerRepository } from './logger.repository';

@Module({
    controllers: [LoggerController],
    providers:   [LoggerService, LoggerRepository],
})
export class LoggerModule {}
