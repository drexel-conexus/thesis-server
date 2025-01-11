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

  getCurrentMonthAnnouncements() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return this.model.find(
      {
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
      {
        sort: { date: -1 },
      },
      { limit: 4 },
    );
  }

  create(createAnnouncementDto: CreateAnnouncementDto) {
    return this.model.create(createAnnouncementDto);
  }

  findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }

  findAllWeb() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return this.model
      .find({
        $and: [{ startDate: { $lte: now } }, { endDate: { $gte: today } }],
      })
      .sort({ createdAt: -1 });
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
