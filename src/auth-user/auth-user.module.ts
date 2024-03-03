import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './Schema/auth-user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:AuthUser.name,schema:AuthUserSchema}])],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
