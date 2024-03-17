import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './schema/auth-user.schema';
import { JwtStrategy } from './strategy/auth.strategy';

@Module({
  imports:[MongooseModule.forFeature([{name:AuthUser.name,schema:AuthUserSchema}])],
  controllers: [AuthUserController],
  providers: [AuthUserService,JwtStrategy],
  exports:[AuthUserService,JwtStrategy]
})
export class AuthUserModule {}
