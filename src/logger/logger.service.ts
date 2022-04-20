import { Injectable } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerRepository } from './logger.repository';
import { LogSearchDto } from './dto/log-search.dto';

@Injectable()
export class LoggerService {
    constructor (
      private readonly loggerRepository: LoggerRepository,
    ) {}

    async create (createLoggerDto: CreateLoggerDto) {
        await this.loggerRepository.create(createLoggerDto);
    }

    public async getAllLogs (query: LogSearchDto) {
        return await this.loggerRepository.findAll(query);
    }
}


