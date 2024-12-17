import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsString()
  maritalStatus: string;

  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @IsNotEmpty()
  @IsString()
  motherName: string;

  @IsNotEmpty()
  @IsString()
  fatherPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  motherPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  picture: {
    s3Key: string;
    url: string;
  };
}

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {}
