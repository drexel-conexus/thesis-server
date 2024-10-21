import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAnnouncementDto {
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
  imageUrl: string;

  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    description: 'Active status of the announcement',
  })
  active: boolean;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Author of the announcement',
  })
  author: string;

  @IsOptional()
  @ApiProperty({
    type: 'object',
    description: 'Image of the announcement',
  })
  image: {
    s3Key: string;
    s3Url: string;
  };
}

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {}
