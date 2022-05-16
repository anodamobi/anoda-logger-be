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
        @InjectConnection('data') private conn: Connection,
    ) {
        this.models = {};
    }

    public async create (createLoggerDto: CreateLoggerDto) {
        const projects = process.env.PROJECTS.split(' ');

        if (!projects.includes(createLoggerDto.project)) {
            throw new HttpException('Your project does not exist', HttpStatus.NOT_FOUND);
        }

        if (this.models.hasOwnProperty(createLoggerDto.project)) {
            const model = this.models[createLoggerDto.project];
            await model.create(createLoggerDto.logData);
        }
        else {
            const model = await this.conn.model(createLoggerDto.project, LoggerSchema);
            this.models[createLoggerDto.project] = model;
            await model.create(createLoggerDto.logData);
        }
    }

    public async findAll (query: LogSearchDto) {
        const projects = process.env.PROJECTS.split(' ');

        if (!projects.includes(query.project)) {
            throw new HttpException('Collection for this project not found', HttpStatus.NOT_FOUND);
        }

        let logModel = this.models[query.project];
        if (!logModel) {
            logModel = this.conn.model(query.project, LoggerSchema);
            this.models[query.project] = logModel;
        }

        let timeQuery = null;

        if (query.dateFrom && query.dateUntil) {
            timeQuery = { timestamp: { $gte: (new Date(query.dateFrom)).toISOString(),
                $lte: (new Date(query.dateUntil)).toISOString() } };
        }
        else if (query.dateFrom) {
            timeQuery = { timestamp: { $gte: (new Date(query.dateFrom)).toISOString() } };
        }
        else if (query.dateUntil) {
            timeQuery = { timestamp: { $lte: (new Date(query.dateUntil)).toISOString() } };
        }


        const totalItems = await logModel.countDocuments({
            ...(query.traceId ? { traceId: query.traceId } : null),
            ...(query.context ? { context: query.context } : null),
            ...(query.env ? { env: query.env } : null),
            ...(timeQuery) });

        const logs = await logModel.find({
            ...(query.traceId ? { traceId: query.traceId } : null),
            ...(query.context ? { context: query.context } : null),
            ...(query.env ? { env: query.env } : null),
            ...(timeQuery),
        })
            .skip(query.limit * (query.page - 1))
            .limit(query.limit)
            .sort({ timestamp: query.order });

        if (logs.length === 0) {
            throw new HttpException('No logs for this project exist', HttpStatus.NOT_FOUND);
        }

        return {
            pagination: {
                ...this.getPaginationData(query, totalItems),
            },
            data: logs && logs.map((log) => {
                return new PublicLogOutDto(log);
            }),
        };
    }

    findAllProjects () {
        const projects = process.env.PROJECTS.split(' ');
        return { projects: projects };
    }


    private getPaginationData (query: LogSearchDto, totalItems: number) {
        return {
            total: Math.ceil(totalItems / query.limit),
            page:  query.page,
            limit: query.limit,
        };
    }
}
