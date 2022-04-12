import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger, loggerSchema } from 'src/_schemas/logger.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Logger.name, schema: loggerSchema }])],
  controllers: [LoggerController],
  providers: [LoggerService]
})
export class LoggerModule {}
