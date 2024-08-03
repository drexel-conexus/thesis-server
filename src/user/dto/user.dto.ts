import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from 'src/constant';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsEnum(Object.values(UserType))
  @IsDefined()
  userType: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
