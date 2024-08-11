import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ClsModule } from 'nestjs-cls';
import { EventsModule } from './events/events.module';
import { AnnouncementModule } from './announcement/announcement.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigService available globally
      envFilePath: '.env', // Explicitly specify the .env file path
    }),
    MongooseModule.forRoot(
      'mongodb+srv://mongodb:FSCVeQhKeyKfbf07@cluster0.kyw0ibx.mongodb.net/dev?retryWrites=true&w=majority',
    ),
    // MongooseModule.forRootAsync({
    //   connectionName: 'main',
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     mongoose.set('debug', true);
    //     const uri = configService.get<string>('MONGO_URI');
    //     return { uri };
    //   },
    // }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
    UserModule,
    EventsModule,
    AnnouncementModule,
  ],
  providers: [],
})
export class AppModule {}
