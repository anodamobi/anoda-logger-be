import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger, LoggerDocument } from '../_schemas/logger.schema';
import { CreateLoggerDto } from './dto/create-logger.dto';

@Injectable()
export class LoggerService {
  constructor(@InjectModel(Logger.name) private loggerModel: Model<LoggerDocument>) {}

  async create(createLoggerDto: CreateLoggerDto) {
    const createdLogger = new this.loggerModel(createLoggerDto);
    return createdLogger.save();
  }

  async findAll() {
    return this.loggerModel.find().exec();
  }
}
// @Injectable()
// export class LoggersService {
//   constructor(@InjectModel(Logger.name) private loggerModel: Model<LoggerDocument>) {}

//   async create(createLoggerDto: CreateLoggerDto): Promise<Logger> {
//     const createdLogger = new this.loggerModel(createLoggerDto);
//     return createdLogger.save();
//   }

//   async findAll(): Promise<Logger[]> {
//     return this.loggerModel.find().exec();
//   }
// }
