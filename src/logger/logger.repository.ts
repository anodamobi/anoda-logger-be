import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerSchema } from '../_schemas/logger.schema';
import { LogSearchDto } from './dto/log-search.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PublicLogOutDto } from './dto/public-log-out.dto';

export class LoggerRepository {
    private models: Object;
    constructor (
        @InjectConnection() private conn: Connection,
    ) {
        this.models = {};
    }

    public async create (createLoggerDto: CreateLoggerDto) {
        if (this.models.hasOwnProperty(createLoggerDto.project)) {
            const model = this.models[createLoggerDto.project];
            await model.create(createLoggerDto.logData);
        }
        else {
            const model = this.conn.model(createLoggerDto.project, LoggerSchema);
            this.models[createLoggerDto.project] = model;
            await model.create(createLoggerDto.logData);
        }
    }

    public async findAll (query: LogSearchDto) {
        const logModel = this.models[query.project];
        if (!logModel) {
            throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
        }
        const totalItems = await logModel.countDocuments();
        const logs = await logModel.find({
            ...(query.traceId ? { level: query.traceId } : null),
        })
            .skip(query.limit * (query.page - 1))
            .limit(query.limit)
            .sort({ timeOfIssue: 1 });

        return {
            pagination: {
                ...this.getPaginationData(query, totalItems),
            },
            data: logs && logs.map((log) => {
                return new PublicLogOutDto(log);
            }),
        };
    }

    private getPaginationData (query: LogSearchDto, totalItems: number) {
        return {
            total: Math.ceil(totalItems / query.limit),
            page:  query.page,
            limit: query.limit,
        };
    }
}
