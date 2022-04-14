import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { AuthGuard } from '@nestjs/passport';
import { SearchPaginationDto } from '../shared/search-pagination.dto';

@Controller('logger')
@UseGuards(AuthGuard('api-key'))
export class LoggerController {
    constructor (private readonly loggerService: LoggerService) {}

  @Post()
    create (@Body() createLoggerDto: CreateLoggerDto) {
        this.loggerService.create(createLoggerDto);

        return 'Created';
    }


    // @Get('')
    // async getAllCompanies (
    //     @Query() query: SearchPaginationDto,
    // ) {
    //     return  this.loggerService.getAllLogs(query);
    //
    // }

}
