import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoggerDocument = Logger & Document;

@Schema({timestamps: true, versionKey: false})
export class Logger {
  @Prop({required: true, index: true})
  project: string;

  @Prop({required: true})
  context: string;

  @Prop({required: true})
  message: string[];

  @Prop({required: true, index: true})
  level: string;

}

export const loggerSchema = SchemaFactory.createForClass(Logger);
