import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}




}
