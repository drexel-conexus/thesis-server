import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  Delete,
  Param,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { Express } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { uploadImage } from './s3.dto';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { FileType } from 'src/constant';
import { validateFile, validateImage } from 'src/utils/utils';

@Controller({
  path: 'upload',
  version: '1',
})
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
        maxCount: 1,
      },
      {
        name: 'file',
        maxCount: 1,
      },
    ]),
  )
  @ApiOperation({ summary: 'Upload archive template' })
  async uploadFile(
    @Body() dto: uploadImage,
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
      file: Express.Multer.File[];
    },
  ) {
    const { fileType } = dto;
    if (fileType === FileType.IMAGE && files?.image) {
      console.log(files.image[0]);
      const image = files.image[0];
      if (!validateImage(image)) {
        throw new BadRequestException('Invalid image');
      }
      const s3Key = `assets/${+new Date()}/${image.originalname}`;
      await this.s3Service.uploadFile(s3Key, image.buffer, image.mimetype);
      return { s3Key: s3Key, s3Url: this.s3Service.getPublicUrl(s3Key) };
    } else if (fileType === FileType.FILE && files?.file) {
      const file = files.file[0];
      if (!validateFile(file)) {
        throw new BadRequestException('Invalid file');
      }
      const s3Key = `assets/${+new Date()}/${file.originalname}`;
      await this.s3Service.uploadFile(s3Key, file.buffer, file.mimetype);
      return { s3Key: s3Key, s3Url: this.s3Service.getPublicUrl(s3Key) };
    }
    throw new BadRequestException('Invalid file type');
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Delete('delete')
  async deleteFile(@Query('s3Key') s3Key: string) {
    await this.s3Service.deleteFile(s3Key);
    return { message: 'File deleted successfully' };
  }
}
