import {Types} from "mongoose";

export class LogsEntity {
    _id: Types.ObjectId;
    project: string;
    context: string;
    message: string[];
    level: string


    // eslint-disable-next-line sonarjs/cognitive-complexity
    constructor(init: Partial<LogsEntity>) {
        this._id = init._id || null;
        this.project = init.project || null;
        this.context = init.context || null;
        this.message = init.message || null;
        this.level = init.level || null;
    }
}
