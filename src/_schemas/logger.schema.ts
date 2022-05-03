import { Schema }  from 'mongoose';

export const LoggerSchema = new Schema({
    context:   { type: String, index: 1 },
    traceId:   { type: String, index: 1 },
    message:   String,
    timestamp: { type: Date, index: 1 },
    env:       { type: String, index: 1 },
}, {
    versionKey: false,
    timestamps: false,
});
