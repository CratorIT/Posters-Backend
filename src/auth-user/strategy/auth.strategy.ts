import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthUser } from '../schema/auth-user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(AuthUser.name) private readonly UserModel : Model<AuthUser>,
  ) {
    super({
      jwtFromRequest: (req: Request) => req.cookies.CratorTech,
      secretOrKey: process.env.Token_secret,
    });
  }

  async validate(payload: any) {
    const { _id } = payload;
    try {
    const user = await this.UserModel.findById({ _id: _id });
      if (!user || user.Role !== 'Admin') {
        throw new UnauthorizedException('Not authorized to access this route');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
