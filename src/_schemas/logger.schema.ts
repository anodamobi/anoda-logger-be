import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoggerDocument = Logger & Document;

@Schema()
export class Logger {
  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  context: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  date: Date;
}

export const loggerSchema = SchemaFactory.createForClass(Logger);
