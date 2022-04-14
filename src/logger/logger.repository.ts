import { InjectConnection } from '@nestjs/mongoose';
import { LogEntity } from '../domain/logs.entity';
import { Connection, Types } from 'mongoose';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerSchema } from '../_schemas/logger.schema';
import { LogSearchDto } from './dto/log-search.dto';
import { LogDo } from '../_schemas/logs.do';

export class LoggerRepository {

    constructor (
        @InjectConnection() private conn: Connection,
    ) {}

    public async create (createLoggerDto: CreateLoggerDto) {
        const model = this.conn.model(createLoggerDto.project, LoggerSchema);
        const log = new model(createLoggerDto.logData);
        await log.save();
    }

    public async findAll (query: LogSearchDto): Promise<LogEntity[]> {
        const logModel = this.conn.model(query.project, LoggerSchema);
        const logs = await logModel.find({
            ...(query.level ? { level: query.level }  : null),
        })
            .skip(query?.offset)
            .limit(100);


        return logs && logs.map((log) => {
            return this.toEntity(log.toObject());
        });
    }

    public toEntity (logDo: LogDo) : LogEntity {
        return new LogEntity({
            ...logDo,
            _id: logDo._id.toHexString(),
        });
    }

    public toDataObject (log: LogEntity) : LogDo {
        return new LogDo({
            ...log,
            _id: new Types.ObjectId(log._id),
        });
    }
}
