import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ClsModule } from 'nestjs-cls';
import { EventsModule } from './events/events.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { S3Module } from './s3/s3.module';
import { AssetModule } from './asset/asset.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://mongodb:FSCVeQhKeyKfbf07@cluster0.kyw0ibx.mongodb.net/dev?retryWrites=true&w=majority',
    ),
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
    S3Module,
    UserModule,
    EventsModule,
    AnnouncementModule,
    AssetModule,
  ],
  providers: [],
})
export class AppModule {}
