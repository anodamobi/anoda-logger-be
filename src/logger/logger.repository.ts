import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerSchema } from '../_schemas/logger.schema';
import { LogSearchDto } from './dto/log-search.dto';

export class LoggerRepository {
    models: Object;
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
        return await logModel.find({
            ...(query.level ? { level: query.level }  : null),
        })
            .skip(query?.offset)
            .limit(query.limit)
            .sort({ timeOfIssue: 1 });
    }
}
