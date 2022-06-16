import { ELevel } from '../../_shared/interfaces';

export class PublicLogOutDto {
    _id: string;
    context: string;
    message: string;
    traceId: string;
    level: ELevel;
    timestamp: Date;
    env: string;

    constructor (init: Partial<PublicLogOutDto>) {
        this._id = init._id || null;
        this.context = init.context || null;
        this.message = init.message || null;
        this.traceId = init.traceId || null;
        this.timestamp = init.timestamp || null;
        this.env = init.env || null;
        this.level = init.level || null;
    }
}
