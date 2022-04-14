import { Types } from 'mongoose';


export class LogDo {
    _id: Types.ObjectId;
    context: string;
    message: string;
    level: string;
    timeOfIssue: Date;


    constructor (props: Partial<LogDo>) {
        this._id = props._id || null;
        this.context = props.context || null;
        this.message = props.message || null;
        this.level = props.level || null;
        this.timeOfIssue = props.timeOfIssue || null;
    }
}
