import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsDefined()
  @ApiProperty({
    type: 'string',
    description: 'Title of the event',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Subtitle of the event',
  })
  subtitle: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Body of the event',
  })
  body: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Date of the event',
  })
  date: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Footer of the event',
  })
  footer: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Image URL of the event',
  })
  image: {
    s3Key: string;
    s3Url: string;
  };
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
