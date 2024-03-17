import { IsEmail, IsMobilePhone, IsString,validate,IsNotEmpty, Validate } from 'class-validator';
import exp from 'constants';

class IsEitherEmailOrMobileNo {
  validate(object: any) {
    return 'Email' in object || 'MobileNo' in object;
  }
  defaultMessage() {
    return 'Either Email or MobileNo must be provided';
  }
}

export class RegisterDto {
  @IsString()
  UserName: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  MobileNo: number;

  @IsString()
  Password: string;
}

export class LoginDto {

  Email?: string;
  
  MobileNo?: number;

  @IsString()
  Password: string;
}



