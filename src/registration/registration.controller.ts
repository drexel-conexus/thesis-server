import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegistrationService } from './registration.service';
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
} from './dto/registration.dto';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { query } from 'express';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  private generateFileKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  @Post()
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    const fileNumber = this.generateFileKey();
    return this.registrationService.create({
      ...createRegistrationDto,
      fileNumber,
    });
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(
    @Query('gradeToEnroll') gradeToEnroll: string,
    @Query('fileNumber') fileNumber: string,
  ) {
    const query: Record<string, any> = {};
    if (gradeToEnroll) {
      query.gradeToEnroll = { $in: gradeToEnroll.split(',') };
    }
    if (fileNumber) {
      query.fileNumber = new RegExp(fileNumber);
    }
    return this.registrationService.findAll(query);
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return this.registrationService.update(id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(id);
  }
}
