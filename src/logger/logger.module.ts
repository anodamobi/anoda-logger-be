import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerRepository } from './logger.repository';

@Module({
    controllers: [LoggerController],
    providers:   [LoggerRepository],
})
export class LoggerModule {}
