import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({ timestamps: true })
export class Asset {
  static modelName = 'Asset';

  @Prop({ required: true })
  type: string;

  @Prop({
    required: false,
    type: [
      {
        s3Key: { type: String },
        s3Url: { type: String },
        title: { type: String, required: false },
      },
    ],
  })
  images: {
    s3Key: string;
    s3Url: string;
    title?: string;
  }[];
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
