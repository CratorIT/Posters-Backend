import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './Schema/product.schema';
import { Model, mongo } from 'mongoose';
import { generateSKU } from 'src/utility/common.utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addProduct(body, res) {
    const SKU = generateSKU();
    const { Name, Cost, Category, Type, SellingPrice, MRP, Description } = body;
    try {
      const crateProduct = new this.productModel({
        SKU,
        Name,
        Cost,
        Category,
        Type,
        SellingPrice,
        MRP,
        Description,
      });
      const result = await crateProduct.save();
      return res.status(200).json({
        message: 'Product added successfully',
        data: result,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllProducts(res) {
    try {
      const products = await this.productModel.find().select({"SKU":1,"Name":1,"Category":1,"Type":1,"SellingPrice":1,"MRP":1,"Description":1,"_id":1});
      return res.status(200).json({status:true,data:products});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
