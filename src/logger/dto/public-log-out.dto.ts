import { LogEntity } from '../../domain/logs.entity';


export class PublicLogOutDto {
    _id: string;
    context: string;
    message: string;
    level: string;
    timeOfIssue: Date;

    constructor (init: LogEntity) {
        this._id = init._id || null;
        this.context = init.context || null;
        this.message = init.message || null;
        this.level = init.level || null;
        this.timeOfIssue = init.timeOfIssue || null;
    }
}
