import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {SearchPaginationDto} from "../shared/search-pagination.dto";
import {PaginatedData} from "../shared/interfaces";
import {Logger, LoggerDocument} from "../_schemas/logger.schema";
import {TLogsDo} from "../_schemas/logs.do";
import {LogsEntity} from "../domain/logs.entity";

export class LoggerRepository {

    constructor(
        @InjectModel(Logger.name) private loggerModel: Model<LoggerDocument>
    ) {
    }

    public async findAll(query: SearchPaginationDto): Promise<PaginatedData<LogsEntity>> {
        const totalItems = await this.loggerModel.countDocuments();
        const logs = await this.loggerModel.find({
            ...(query.search ? {'$text': {$search: query.search}} : null),
        })
            .skip(query.limit * (query.page - 1))
            .limit(query.limit);

        return {
            pagination: {
                ...this.getPaginationData(query, totalItems),
            },
            data: logs && logs.map((logsDo) => {
                return this.toEntity(logsDo.toObject());
            }),
        };


    }

    private getPaginationData(query: SearchPaginationDto, totalItems: number) {
        return {
            total: Math.ceil(totalItems / query.limit),
            page: query.page,
            limit: query.limit,
        };
    }
    public toEntity (logsDo: TLogsDo): LogsEntity {
        return new LogsEntity({
            ...logsDo
        });
    }
}
