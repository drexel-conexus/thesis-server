import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from './s3.service';
import { UploadController } from './s3.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UploadController],
  providers: [S3Service],
})
export class S3Module {}
