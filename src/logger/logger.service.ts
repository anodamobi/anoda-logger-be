import { Injectable } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerRepository } from './logger.repository';
import { LogSearchDto } from './dto/log-search.dto';
import { PublicLogOutDto } from './dto/public-log-out.dto';

@Injectable()
export class LoggerService {
    constructor (
      private readonly loggerRepository: LoggerRepository,
    ) {}

    async create (createLoggerDto: CreateLoggerDto) {
        await this.loggerRepository.create(createLoggerDto);
    }

    public async getAllLogs (query: LogSearchDto) {
        const logs = await this.loggerRepository.findAll(query);
        return logs.map((log) => {
            return new PublicLogOutDto(log);
        });
    }
}


