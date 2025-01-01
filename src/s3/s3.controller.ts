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
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { Express } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { uploadImage } from './s3.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller({
  path: 'upload',
  version: '1',
})
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
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
    },
  ) {
    const file = files.image[0];
    const s3Key = `assets/${+new Date()}/${file.originalname}`;
    await this.s3Service.uploadFile(s3Key, file.buffer, file.mimetype);
    return { s3Key: s3Key, s3Url: this.s3Service.getPublicUrl(s3Key) };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete')
  async deleteFile(@Query('s3Key') s3Key: string) {
    await this.s3Service.deleteFile(s3Key);
  }
}
