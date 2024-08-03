import { Common } from 'src/common';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from 'src/constant';

export class User extends Common {
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}
