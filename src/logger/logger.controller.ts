import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { AuthGuard } from '@nestjs/passport';
import { LogSearchDto } from './dto/log-search.dto';
import { LoggerRepository } from './logger.repository';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('logger')
export class LoggerController {
    constructor (private readonly loggerRepository: LoggerRepository) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
    create (@Body() createLoggerDto: CreateLoggerDto) {
        this.loggerRepository.create(createLoggerDto)
            .catch((error) => {
                console.log(error);
            });

        return 'Created';
    }


    @Get()
    @UseGuards(JwtAuthGuard)
  getAllLogs (@Query() query: LogSearchDto) {
      return this.loggerRepository.findAll(query);
  }

  @Get('/projects')
  @UseGuards(JwtAuthGuard)
    getListOfprojects () {
        return this.loggerRepository.findAllProjects();
    }

}
