import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger, LoggerDocument } from '../_schemas/logger.schema';
import { CreateLoggerDto } from './dto/create-logger.dto';
import {SearchPaginationDto} from "../shared/search-pagination.dto";
import {PaginatedData} from "../shared/interfaces";
import {LoggerRepository} from "./logger.repository";
import {LogsEntity} from "../domain/logs.entity";
import {LogsOutDto} from "./dto/logs-out-dto";

@Injectable()
export class LoggerService {
  constructor(
      private readonly loggerRepository: LoggerRepository,
      private readonly createLoggerDto: CreateLoggerDto,
      @InjectModel(Logger.name) private loggerModel: Model<LoggerDocument>) {}

  async create(createLoggerDto: CreateLoggerDto) {
    const createdLogger = new this.loggerModel(createLoggerDto);
    return createdLogger.save();
  }

  // async findAll() {
  //   return this.loggerModel.find().exec();
  // }

  public async getAllLogs (query: SearchPaginationDto): Promise<PaginatedData<LogsEntity>> {
    const logs = await this.loggerRepository.findAll(query);
    return {
      pagination: logs.pagination,
      data:
          // await this.loggerModel.find().exec()
          await Promise.all(logs.data.map(async (log) => {
        return this.toLogsOutDto(log);
      })),
    };
  }
  public async toLogsOutDto(logs: LogsEntity): Promise<LogsOutDto> {
    return new LogsOutDto(logs);
  }
}
// @Injectable()
// export class LoggersService {
//   constructor(@InjectModel(Logger.name) private loggerModel: Model<LoggerDocument>) {}

//   async create(createLoggerDto: CreateLoggerDto): Promise<Logger> {
//     const createdLogger = new this.loggerModel(createLoggerDto);
//     return createdLogger.save();
//   }


