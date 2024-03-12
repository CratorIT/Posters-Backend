import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { RegisterDto,LoginDto } from './dto/create-auth-user.dto';
import { AdminAuthGuard } from './guards/auth.guards';

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


  // get all user for cms
  // protected route for admin
  @UseGuards(AdminAuthGuard)
  @Get('/admin/getAllUsers')
  async findAllUser(@Res() res:Response){
    return this.authUserService.findAllUser(res)

  }
}
