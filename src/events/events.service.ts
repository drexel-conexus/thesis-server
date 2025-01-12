import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { EventDocument, Event } from './schema/event.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.modelName) private model: Model<EventDocument>,
  ) {}

  create(createEventDto: CreateEventDto) {
    return this.model.create(createEventDto);
  }

  async getCurrentMonthEvents(month?: number) {
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = now.getFullYear();

    const startOfMonth = new Date(targetYear, targetMonth - 1, 1);
    const endOfMonth = new Date(targetYear, targetMonth, 0);

    const startDate =
      targetMonth === now.getMonth() + 1
        ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
        : startOfMonth;

    return this.model
      .find({
        date: {
          $gte: startDate,
          $lte: endOfMonth,
        },
      })
      .sort({ date: 1 });
  }

  findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const doc = await this.findOne(id);
    if (!doc) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    doc.set(updateEventDto);
    await doc.save();
  }

  async remove(id: string) {
    const doc = await this.findOne(id);
    if (!doc) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    await doc.deleteOne();
    return { message: 'Event deleted successfully' };
  }
}
