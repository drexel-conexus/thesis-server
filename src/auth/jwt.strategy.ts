import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
    console.log(
      'JWT Strategy initialized with secret:',
      process.env.JWT_SECRET,
    );
  }

  async validate(payload: any) {
    try {
      console.log('Validating payload:', payload);
      const user = await this.authService.validateUser(payload);
      console.log('Validated user:', user);
      if (!user) {
        console.log('No user found');
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'Unauthorized access',
          error: 'Unauthorized',
        });
      }
      return user;
    } catch (error) {
      console.error('JWT validation error:', error);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid token or session expired',
        error: 'Unauthorized',
      });
    }
  }
}
