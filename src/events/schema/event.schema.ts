import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  static modelName = 'Event';

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  subtitle: string;

  @Prop({ required: false })
  body: string;

  @Prop({ required: false, type: Date })
  date: Date;

  @Prop({ required: false })
  footer: string;

  @Prop({ required: false })
  imageUrl: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
