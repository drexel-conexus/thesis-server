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
    @InjectModel(Registration.name)
    private registrationModel: Model<Registration>,
  ) {}

  private generateFileKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async create(createRegistrationDto: CreateRegistrationDto) {
    let attempts = 0;
    const maxAttempts = 5;
    if (!createRegistrationDto.fileNumber) {
      createRegistrationDto.fileNumber = this.generateFileKey();
    }
    while (attempts < maxAttempts) {
      try {
        console.log(createRegistrationDto);
        const registration = await this.registrationModel.create(
          createRegistrationDto,
        );
        return registration;
      } catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern?.fileKey) {
          createRegistrationDto.fileKey = this.generateFileKey();
          attempts++;
          continue;
        }
        throw error;
      }
    }
    throw new Error(
      'Unable to generate unique file key after maximum attempts',
    );
  }

  findAll(query?: Record<string, any>) {
    return this.registrationModel.find(query);
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
