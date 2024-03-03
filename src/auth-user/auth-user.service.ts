import { Injectable } from '@nestjs/common';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './Schema/auth-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>
  ){}

}
