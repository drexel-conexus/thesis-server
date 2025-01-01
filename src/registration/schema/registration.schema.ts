import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegistrationDocument = HydratedDocument<Registration>;

@Schema({ timestamps: true })
export class Registration {
  static modelName = 'Registration';

  @Prop({ required: true, unique: true, index: true })
  fileNumber: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  sex: string;

  @Prop({ required: true })
  maritalStatus: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop({ required: true })
  motherName: string;

  @Prop({ required: true })
  fatherPhoneNumber: string;

  @Prop({ required: true })
  motherPhoneNumber: string;

  @Prop({ required: true, type: Object })
  picture: {
    s3Key: string;
    s3Url: string;
  };
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);
