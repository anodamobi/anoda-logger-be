import { Expose } from 'class-transformer';
import {LogsEntity} from "../../domain/logs.entity";

@Expose()
export class LogsOutDto extends LogsEntity {

    constructor (init: Partial<LogsOutDto>) {
        super(init);
    }
}

