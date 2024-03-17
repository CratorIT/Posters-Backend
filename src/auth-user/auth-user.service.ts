import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './schema/auth-user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>,
  ) {}

  // register user controller for ecommerce site
  async registerUser(registerDto: RegisterDto, res) {
    try {
      const { Email, MobileNo, Password, UserName } = registerDto;
      if (!Email || !MobileNo || !Password)
        return res
          .status(400)
          .json({ status: false, message: 'Please fill all the fields' });
      const user = await this.authUserModel.findOne({
        $or: [{ Email: Email }, { MobileNo: MobileNo }],
      });
      if (user) {
        return res
          .status(400)
          .json({ status: false, message: 'User already exist pls login' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(Password, salt);
      const newUser = new this.authUserModel({
        UserName,
        Email,
        MobileNo,
        Password: hashPassword,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ status: true, message: 'User Created Successfully' });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // login user controller for ecommerce site
  async loginUser(loginUser, res): Promise<LoginDto> {
    try {
      const { Email, MobileNo, Password } = loginUser;
      if ((!Email && !MobileNo) || !Password)
        return res.status(400).json({
          status: false,
          message: 'Please fill all the required fields',
        });
      const user: any = await this.authUserModel.findOne({
        $or: [{ Email: Email }, { MobileNo: MobileNo }],
      });
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: 'User not found' });
      const validPassword = await bcrypt.compare(Password, user.Password);
      if (!validPassword)
        return res
          .status(400)
          .json({ status: false, message: 'Invalid Password' });
      const token = jwt.sign({ id : user._id }, process.env.Token_secret, {
        expiresIn: '60d',
      });

      res
        .status(200)
        .cookie('CratorTech', token, {
          expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: true,
        })
        .json({ status: true, message: 'User logged in successfully' });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // get all user for cms
  async findAllUser(res){
    try {
      const users = await this.authUserModel.find()
      return res.status(200).json({status:true,users})
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
