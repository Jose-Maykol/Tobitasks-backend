import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'paloma',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateJwtToken(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
