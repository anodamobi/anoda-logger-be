import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { AuthGuard } from '@nestjs/passport';
import { LogSearchDto } from './dto/log-search.dto';
import { LoggerRepository } from './logger.repository';

@Controller('logger')
@UseGuards(AuthGuard('api-key'))
export class LoggerController {
    constructor (private readonly loggerRepository: LoggerRepository) {}

  @Post()
    create (@Body() createLoggerDto: CreateLoggerDto) {
        this.loggerRepository.create(createLoggerDto)
            .catch((error) => {
                console.log(error);
            });

        return 'Created';
    }


    @Get('')
  async getAllLogs (
        @Query() query: LogSearchDto,
  ) {
      return this.loggerRepository.findAll(query);
  }

}
