import {Controller, Get, Post, Body, UseGuards, Query} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { AuthGuard } from '@nestjs/passport';
import {SearchPaginationDto} from "../shared/search-pagination.dto";

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  create(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggerService.create(createLoggerDto);
  }


  @Get('')
  @UseGuards(AuthGuard('api-key'))
  async getAllCompanies (
      @Query() query: SearchPaginationDto,
  ) {
    return  this.loggerService.getAllLogs(query);

  }

}
