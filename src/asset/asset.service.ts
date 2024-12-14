import { Injectable } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';
import { Asset, AssetDocument } from './schema/asset.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset.modelName) private model: Model<AssetDocument>,
  ) {}

  create(createAssetDto: CreateAssetDto) {
    return this.model.create(createAssetDto);
  }

  findAll() {
    return this.model.find();
  }

  findOne(type: string) {
    return this.model.findOne({ type });
  }

  update(id: string, updateAssetDto: UpdateAssetDto) {
    return this.model.findByIdAndUpdate(id, updateAssetDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
