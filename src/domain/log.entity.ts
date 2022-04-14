import { Exclude } from 'class-transformer';

export class LogEntity {
    public _id: string;
    public context: string;
    public message: string;
    public level: string;
    public timeOfIssue: Date;

    @Exclude()
    public createdAt: Date;
    @Exclude()
    public updatedAt: Date;


    constructor (init: Partial<LogEntity>) {
        if (init._id) {
            this._id = init._id?.toString();
        }
        this.context = init.context || null;
        this.message = init.message || null;
        this.level = init.level || null;
        this.timeOfIssue = init.timeOfIssue || null;
        this.createdAt = init.createdAt || null;
        this.updatedAt = init.updatedAt || null;
    }
}
