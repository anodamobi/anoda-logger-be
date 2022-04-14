import { Schema }  from 'mongoose';
import { LogDo } from './logs.do';

export const LoggerSchema = new Schema<LogDo>({
    context:     String,
    level:       String,
    message:     String,
    timeOfIssue: Date,
}, {
    versionKey: false,
    timestamps: true,
});
