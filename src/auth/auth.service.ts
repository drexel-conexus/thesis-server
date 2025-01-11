import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<any> {
    return await this.userService.findOne(payload.sub);
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
