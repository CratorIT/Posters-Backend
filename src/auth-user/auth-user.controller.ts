import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { RegisterDto,LoginDto } from './dto/create-auth-user.dto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  // register user route for ecommerce site
  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto, @Res() res: Response) {
    return this.authUserService.registerUser(registerDto, res);
  }

 // login user route for ecommerce site
 @Post("login")
  async loginUser(@Body() loginDto:LoginDto,@Res() res:Response){
    return this.authUserService.loginUser(loginDto,res)
  }
}
