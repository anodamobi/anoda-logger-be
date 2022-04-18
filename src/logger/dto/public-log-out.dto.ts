export class PublicLogOutDto {
    _id: string;
    context: string;
    message: string;
    level: string;
    timestamp: Date;

    constructor (init) {
        this._id = init._id || null;
        this.context = init.context || null;
        this.message = init.message || null;
        this.level = init.level || null;
        this.timestamp = init.timestamp || null;
    }
}
