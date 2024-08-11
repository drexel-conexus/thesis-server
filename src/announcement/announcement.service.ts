import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
} from './dto/announcement.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Announcement,
  AnnouncementDocument,
} from './schema/announcement.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(Announcement.modelName) private model: Model<Announcement>,
  ) {}

  create(createAnnouncementDto: CreateAnnouncementDto) {
    return this.model.create(createAnnouncementDto);
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string): Promise<AnnouncementDocument> {
    return this.model.findById(id);
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    const doc = await this.findOne(id);
    if (!doc) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    doc.set(updateAnnouncementDto);
    await doc.save();
  }

  remove(id: string) {
    return this.model.deleteOne({ id });
  }
}