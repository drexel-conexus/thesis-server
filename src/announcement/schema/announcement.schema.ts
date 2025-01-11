import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnnouncementDocument = HydratedDocument<Announcement>;

@Schema({ timestamps: true })
export class Announcement {
  static modelName = 'Announcement';

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  body: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: false })
  author: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false, type: Object })
  image: {
    s3Key: string;
    s3Url: string;
  };
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
