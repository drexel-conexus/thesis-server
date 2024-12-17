import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Type of the asset',
  })
  type: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: 'array',
    description: 'Images of the asset',
    items: {
      type: 'object',
      properties: {
        s3Key: { type: 'string' },
        s3Url: { type: 'string' },
        title: { type: 'string' },
      },
    },
  })
  images: { s3Key: string; s3Url: string; title?: string }[];
}

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
