import { Expose } from 'class-transformer';
import { LogEntity } from '../../domain/logs.entity';

@Expose()
export class LogsOutDto extends LogEntity {

    constructor (init: Partial<LogsOutDto>) {
        super(init);
    }
}

