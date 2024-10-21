import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnnouncementDocument = HydratedDocument<Announcement>;

@Schema({ timestamps: true })
export class Announcement {
  static modelName = 'Announcement';

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  subtitle: string;

  @Prop({ required: false })
  body: string;

  @Prop({ required: false, type: Date })
  date: Date;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: false })
  author: string;

  @Prop({ required: false })
  footer: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false, type: Object })
  image: {
    s3Key: string;
    s3Url: string;
  };
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
