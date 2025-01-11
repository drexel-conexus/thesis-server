import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: 'string',
    description: 'Email of the user',
    format: 'email',
  })
  email: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    type: 'string',
    description: 'First name of the user',
  })
  firstName: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    type: 'string',
    description: 'Last name of the user',
  })
  lastName: string;

  @IsEnum(Object.values(UserType))
  @IsDefined()
  @ApiProperty({
    type: 'string',
    description: 'Type of the user',
    enum: Object.values(UserType),
  })
  userType: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Password of the user',
  })
  password: string;

  @IsOptional()
  @ApiProperty({
    type: 'object',
    description: 'Image of the user',
  })
  image?: {
    s3Key: string;
    s3Url: string;
  };
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class PasswordResetDto {
  @IsString()
  @IsDefined()
  @ApiProperty({
    type: 'string',
    description: 'Old password of the user',
  })
  oldPassword: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    type: 'string',
    description: 'New password of the user',
  })
  newPassword: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    type: 'string',
    description: 'Confirm password of the user',
  })
  confirmPassword: string;
}
