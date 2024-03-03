import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './Schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) productModel: Model<Product>) {}
}
