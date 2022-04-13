import { Types } from 'mongoose';


export class LogsDo {
    _id: Types.ObjectId;
    project: string;
    context: string;
    message: string[];
    level: string


    // eslint-disable-next-line sonarjs/cognitive-complexity
    constructor (props: Partial<LogsDo>) {
        this._id = props._id || null;
        this.project = props.project || null;
        this.context = props.context || null;
        this.message = props.message || null;
        this.level = props.level || null;

    }

}

export type TLogsDo = LogsDo;
