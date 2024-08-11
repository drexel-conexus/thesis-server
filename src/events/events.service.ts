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

  findAll() {
    return this.model.find();
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

  remove(id: number) {
    return this.model.deleteOne({ id });
  }
}
