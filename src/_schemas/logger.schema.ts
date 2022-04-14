import { Schema }  from 'mongoose';
import { LogDo } from './logs.do';

export const LoggerSchema = new Schema<LogDo>({
    context:     String,
    level:       { type: String, index: 1 },
    message:     String,
    timeOfIssue: { type: Date, index: 1 },
}, {
    versionKey: false,
    timestamps: true,
});
