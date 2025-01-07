import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'users',
})
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const doc = await this.userService.login(loginDto);
    const token = await this.authService.login(doc);
    return {
      ...doc.toObject(),
      token: token.access_token,
    };
  }
}
