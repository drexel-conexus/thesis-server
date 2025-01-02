import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ClsModule } from 'nestjs-cls';
import { EventsModule } from './events/events.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { S3Module } from './s3/s3.module';
import { AssetModule } from './asset/asset.module';
import { RegistrationModule } from './registration/registration.module';
import { AuthModule } from './auth/auth.module';
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
    AuthModule,
    UserModule,
    EventsModule,
    AnnouncementModule,
    AssetModule,
    RegistrationModule,
  ],
  providers: [],
})
export class AppModule {}
