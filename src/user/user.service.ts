import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.modelName) private model: Model<UserDocument>,
  ) {}

  async exists(email: string): Promise<boolean> {
    const doc = await this.model.findOne({ email });
    if (doc) {
      return true;
    }
    return false;
  }

  async login(loginDto: { email: string; password: string }) {
    const doc = await this.model.findOne({
      email: loginDto.email,
    });
    if (!doc) {
      throw new NotFoundException('User not found');
    }
    // const valid = await argon2.verify(doc.password, loginDto.password);
    // if (!valid) {
    //   throw new BadRequestException('Invalid password');
    // }
    return doc;
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    user.password = await argon2.hash(user.password);
    const exists = await this.exists(user.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    return this.model.create(user);
  }

  async findAll(): Promise<UserDocument[]> {
    const list = await this.model.find();
    return list;
  }

  async findOne(id: string): Promise<UserDocument> {
    const doc = await this.model.findById(id);
    return doc;
  }

  async update(id: string, updatedUser: UpdateUserDto): Promise<UserDocument> {
    const doc = await this.findOne(id);
    if (!doc) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    doc.set(updatedUser);
    await doc.save();
    return doc;
  }

  async remove(id: string): Promise<boolean> {
    await this.model.deleteOne({ _id: id });
    return true;
  }
}
