import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum GradeLevel {
  NURSERY = 'nursery',
  PRE_KINDER = 'pre-kinder',
  KINDER = 'kinder',
  GRADE1 = 'grade-1',
  GRADE2 = 'grade-2',
  GRADE3 = 'grade-3',
  GRADE4 = 'grade-4',
  GRADE5 = 'grade-5',
  GRADE6 = 'grade-6',
  GRADE7 = 'grade-7',
  GRADE8 = 'grade-8',
  GRADE9 = 'grade-9',
  GRADE10 = 'grade-10',
  GRADE11 = 'grade-11',
  GRADE12 = 'grade-12',
}

export type RegistrationDocument = HydratedDocument<Registration>;

@Schema({ timestamps: true })
export class Registration {
  static modelName = 'Registration';

  @Prop({ required: true, unique: true, index: true })
  fileNumber: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName?: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender: 'male' | 'female' | 'other';

  @Prop({ required: true, enum: ['male', 'female'] })
  sex: 'male' | 'female';

  @Prop({ required: false, enum: ['single', 'married', 'divorced', 'widowed'] })
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';

  @Prop({ required: false })
  birthPlace: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop()
  lastSchoolAttended?: string;

  @Prop({ required: true, enum: Object.values(GradeLevel) })
  gradeToEnroll: GradeLevel;

  @Prop({ required: true })
  motherName: string;

  @Prop({ required: true })
  motherPhoneNumber: string;

  @Prop()
  motherOccupation?: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop({ required: true })
  fatherPhoneNumber: string;

  @Prop()
  fatherOccupation?: string;

  @Prop({ type: Object })
  image?: {
    s3Key: string;
    s3Url: string;
  };

  @Prop({ type: Object })
  reportCard?: {
    s3Key: string;
    s3Url: string;
  };

  @Prop({ required: true, enum: ['new', 'returnee'] })
  studentType: 'new' | 'returnee';

  @Prop()
  previousStudentId?: string;

  @Prop({ required: true })
  schoolYear: string;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);
