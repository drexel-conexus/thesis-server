import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserType } from 'src/constant';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  static modelName = 'User';

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, enum: Object.values(UserType) })
  userType: UserType;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, type: Object })
  image?: {
    s3Key: string;
    s3Url: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
