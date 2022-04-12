import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Logger, LoggerDocument } from '../_schemas/logger.schema';
import { CreateLoggerDto } from './dto/create-logger.dto';

@Injectable()
export class LoggerService {
  create(createLoggerDto: CreateLoggerDto) {
    return 'This action adds a new logger';
  }

  findAll() {
    return `This action returns all logger`;
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
