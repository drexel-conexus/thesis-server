import { Injectable } from '@nestjs/common';
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
} from './dto/registration.dto';
import { Model } from 'mongoose';
import { Registration } from './schema/registration.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registration.modelName)
    private registrationModel: Model<Registration>,
  ) {}

  create(createRegistrationDto: CreateRegistrationDto) {
    return this.registrationModel.create(createRegistrationDto);
  }

  findAll() {
    return this.registrationModel.find();
  }

  findOne(id: string) {
    return this.registrationModel.findById(id);
  }

  update(id: string, updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationModel.findByIdAndUpdate(id, updateRegistrationDto);
  }

  remove(id: string) {
    return this.registrationModel.findByIdAndDelete(id);
  }
}
