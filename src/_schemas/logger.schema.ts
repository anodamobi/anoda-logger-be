import { Schema }  from 'mongoose';
import { ELevel } from '../_shared/interfaces';

export const LoggerSchema = new Schema({
    context:   { type: String, index: 1 },
    traceId:   { type: String, index: 1 },
    message:   String,
    level:     { type: String, enum: Object.values(ELevel), index: 1 },
    timestamp: { type: Date, index: 1 },
    env:       { type: String, index: 1 },
}, {
    versionKey: false,
    timestamps: false,
});
