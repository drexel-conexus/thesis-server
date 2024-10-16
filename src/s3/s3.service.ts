import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  GetObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandOutput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  api: S3Client;

  private readonly publicBucket: string;
  private readonly region: string;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    this.api = new S3Client({
      region: 'us-east-2',
    });

    this.publicBucket = this.config.getOrThrow('PUBLIC_BUCKET');
    this.region = 'us-east-2';
  }

  async uploadFile(
    fileKey: string,
    fileContent: Buffer,
    contentType?: string,
    bucket?: string,
  ): Promise<void> {
    const input: PutObjectCommandInput = {
      Bucket: bucket || this.publicBucket,
      Key: fileKey,
      Body: fileContent,
      ContentType: contentType,
      ContentDisposition: 'inline',
    };
    const cmd: PutObjectCommand = new PutObjectCommand(input);
    await this.api.send<PutObjectCommandInput, PutObjectCommandOutput>(cmd);
  }

  async getFile(fileKey: string, bucket?: string): Promise<Buffer> {
    const input: GetObjectCommandInput = {
      Bucket: bucket || this.publicBucket,
      Key: fileKey,
    };
    const cmd: GetObjectCommand = new GetObjectCommand(input);
    const resp = await this.api.send<
      GetObjectCommandInput,
      GetObjectCommandOutput
    >(cmd);

    const content = await resp.Body.transformToByteArray();

    return Buffer.from(content);
  }

  async putObject(
    input: PutObjectCommandInput,
  ): Promise<PutObjectCommandOutput> {
    const cmd: PutObjectCommand = new PutObjectCommand(input);
    return this.api.send<PutObjectCommandInput, PutObjectCommandOutput>(cmd);
  }

  async deleteFile(fileKey: string, bucket?: string): Promise<void> {
    const input: DeleteObjectCommandInput = {
      Bucket: bucket || this.publicBucket,
      Key: fileKey,
    };
    const cmd: DeleteObjectCommand = new DeleteObjectCommand(input);
    await this.api.send<DeleteObjectCommandInput, DeleteObjectCommandOutput>(
      cmd,
    );
  }

  getPublicUrl(fileKey: string, bucket?: string): string {
    return `https://${bucket || this.publicBucket}.s3.${
      this.region
    }.amazonaws.com/${fileKey}`;
  }

  constructFileKey(property: string, filename: string): string {
    const envName = this.config.getOrThrow('NODE_ENV');
    return [envName, 'qr-design', property, +new Date(), filename].join('/');
  }
}
