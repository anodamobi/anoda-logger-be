import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  create(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggerService.create(createLoggerDto);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  findAll() {
    return this.loggerService.findAll();
  }
}
