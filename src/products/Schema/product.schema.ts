import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductType = HydratedDocument<Product>

@Schema({timestamps:true})
export class Product {
  @Prop({ type: String, required: true, unique: true })
  SKU: String;

  @Prop({type:String,required:true})
  Name:String;

  @Prop({type:String,required:true})
  Categroy:String;

  @Prop({type:Array})
  SubCategory:Array<String>;

  @Prop({type:{fileId:String,Url:String}})
  Image:{fileId:String,Url:string};

  @Prop({type:String})
  AltImageName:String;

  @Prop({type:String})
  Description:String;

  @Prop({type:Array})
  MetaTag:[];

  @Prop({type:Number})
  PopularityCount:Number;

  @Prop({type:Boolean,default:false})
  IsPopular:Boolean;

  @Prop({type:Boolean,default:false})
  IsActive:Boolean;

  @Prop({type:Array})
  Reviews:[]

  @Prop({enum:["Poster","Toy","Tshirt","KeyChain"], type:String,})
  Type:String;

  @Prop({type:Boolean,default:false})
  IsDelete:boolean

}

export const ProductSchema = SchemaFactory.createForClass(Product)
