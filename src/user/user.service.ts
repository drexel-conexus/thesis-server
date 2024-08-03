import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async exists(email: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (error) {
      // Handle errors appropriately (e.g., throw an exception)
      throw new Error(error.message);
    }

    return !!data;
  }

  async create(user: CreateUserDto): Promise<User> {
    const exists = await this.exists(user.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }
    const { data, error } = await this.supabase
      .from('users')
      .insert(user)
      .single();

    if (error) {
      // Handle errors appropriately (e.g., throw an exception)
      throw new Error(error.message);
    }

    return data as User;
  }

  async findAll(): Promise<User[]> {
    const { data, error } = await this.supabase.from('users').select('*');

    if (error) {
      // Handle Supabase errors
      throw new Error('Error fetching users');
    }

    return data as User[];
  }

  async findOne(id: string): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // Handle Supabase errors
      throw new Error('Error fetching user');
    }

    if (!data) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return data as User;
  }

  async update(id: string, updatedUser: UpdateUserDto): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .update(updatedUser)
      .eq('id', id)
      .single();

    if (error) {
      // Handle Supabase errors
      throw new Error('Error updating user');
    }

    if (!data) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return data as User;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.from('users').delete().eq('id', id);

    if (error) {
      // Handle Supabase errors
      throw new Error('Error deleting user');
    }
  }
}
