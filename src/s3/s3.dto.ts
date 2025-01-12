import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { FileType } from 'src/constant';

export class uploadImage {
  @ApiProperty({
    description: 'file type',
    type: 'string',
    required: true,
    enum: Object.values(FileType),
  })
  @IsEnum(FileType)
  fileType: FileType;

  @ApiProperty({
    description: 'logo',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  file?: Express.Multer.File;
}
