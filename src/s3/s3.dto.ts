import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class uploadImage {
  @ApiProperty({
    description: 'logo',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;
}
