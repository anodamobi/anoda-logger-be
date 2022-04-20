import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { AuthGuard } from '@nestjs/passport';
import { LogSearchDto } from './dto/log-search.dto';

@Controller('logger')
@UseGuards(AuthGuard('api-key'))
export class LoggerController {
    constructor (private readonly loggerService: LoggerService) {}

  @Post()
    create (@Body() createLoggerDto: CreateLoggerDto) {
        this.loggerService.create(createLoggerDto)
            .catch((error) => {
                console.log(error);
            });

        return 'Created';
    }


    @Get('')
  async getAllLogs (
        @Query() query: LogSearchDto,
  ) {
      return this.loggerService.getAllLogs(query);
  }

}
