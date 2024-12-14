import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schema/asset.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.modelName, schema: AssetSchema }]),
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
