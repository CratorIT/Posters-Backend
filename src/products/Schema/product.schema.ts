import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductType = HydratedDocument<Product>;

interface Image {
  imageName:{type:String};
  fileId: { type: String };
  lowUrl: { type: String };
  mediumUrl: { type: String };
  highUrl: { type: String };
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true, unique: true })
  SKU: String;

  @Prop({ type: String, required: true })
  Name: String;

  @Prop({ type: String, required: true })
  Category: String;

  @Prop({ type: Array })
  SubCategory: Array<String>;

  @Prop({ type: Number })
  Cost: Number;

  @Prop({ type: Number })
  MRP: Number;

  @Prop({ type: Number })
  SellingPrice: Number;

  @Prop([
    {
      imageName:{type:String},
      fileId: { type: String },
      lowUrl: { type: String },
      mediumUrl: { type: String },
      highUrl: { type: String },
    },
  ])
  Image: [Image];

  @Prop({ type: String })
  AltImageName: String;

  @Prop({ type: String })
  Description: String;

  @Prop({ type: Array })
  MetaTag: [];

  @Prop({ type: Number })
  PopularityCount: Number;

  @Prop({ type: Boolean, default: false })
  IsPopular: Boolean;

  @Prop({ type: Boolean, default: false })
  IsActive: Boolean;

  @Prop({ type: Boolean, default: false })
  IsDiscountAvailable: Boolean;

  @Prop({ type: Array })
  Reviews: [];

  @Prop({ enum: ['Poster', 'Toy', 'Tshirt', 'KeyChain'], type: String })
  Type: String;

  @Prop({ type: Boolean, default: false })
  IsDelete: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
