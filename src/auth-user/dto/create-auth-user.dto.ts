import { IsEmail, IsMobilePhone, IsString } from 'class-validator';
import exp from 'constants';

export class RegisterDto {
  @IsString()
  UserName: string;

  @IsEmail()
  Email: string;

  @IsMobilePhone()
  MobileNo: number;

  @IsString()
  Password: string;
}

export class LoginDto {
  @IsEmail()
  Email: string;

  @IsMobilePhone()
  MobileNo: number;

  @IsString()
  Password: string;
}
