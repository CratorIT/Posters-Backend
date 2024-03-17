import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type AuthUserType = HydratedDocument<AuthUser>;

@Schema({ timestamps: true })
export class AuthUser {
  @Prop({ type: String })
  UserName: String;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  })
  Email: String;

  @Prop({ type: Number, required: true, unique: true })
  MobileNo: Number;

  @Prop({ type: Number })
  AltMobileNo: Number;

  @Prop({ type: String, required: true })
  Password: String;

  @Prop({ type: String, enum: ['Admin', 'User'],default: 'User'})
  Role: String;

  @Prop({ type: String })
  Otp: String;

  @Prop({ type: Array })
  Interest: Array<string>;

  @Prop({ type: Boolean ,default:true})
  IsNew: Boolean;

  @Prop({ type: { fileId: String, url: String } })
  Profile: { fileId: String; url: String };

  @Prop({ type: Boolean ,default:false})
  IsRegular: Boolean;

  @Prop({ type: Boolean ,default:false})
  IsDiscountedCustomer: Boolean;

  @Prop({ type: Array })
  Discount: [];

  @Prop({ type: Number, default: 0 })
  Coin: Number;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
