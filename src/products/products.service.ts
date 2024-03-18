import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './Schema/product.schema';
import { Model, mongo } from 'mongoose';
import { generateSKU } from 'src/utility/common.utils';
import { last } from 'rxjs';
import { ImagekitService } from 'src/imagekit/imagekit.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private imagekit: ImagekitService,
  ) {}

  async addProduct(body, res) {
    const { Name, Cost, Category, Type, SellingPrice, MRP, Description } = body;
    if (
      !Name ||
      !Cost ||
      !Category ||
      !Type ||
      !SellingPrice ||
      !MRP ||
      !Description
    )
      return res.status(400).json({ message: 'All fields are required' });
    const lastSku = await this.productModel.find().sort({ SKU: -1 }).limit(1);
    const lastFiveDigit = lastSku.length > 0 ? lastSku[0].SKU.slice(-5) : 0;
    const twoDigitFromType = Type.slice(0, 2).toUpperCase();
    const SKU = generateSKU(lastFiveDigit, twoDigitFromType);

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
      const products = await this.productModel.find().select({
        SKU: 1,
        Name: 1,
        Category: 1,
        Type: 1,
        SellingPrice: 1,
        MRP: 1,
        Description: 1,
        _id: 1,
      });
      return res.status(200).json({ status: true, data: products });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async uploadProductImage(image, body, res) {
    try {
      const { SKU, ImageName } = body;
      if (!SKU || !ImageName || !image)
        return res.status(400).json({ message: 'all field are required' });
      const product = await this.productModel.findOne({ SKU });
      if (!product)
        return res.status(400).json({ message: 'Product not found' });
      const folderPath = `${process.env.FOLDER_NAME}/${product.Type}`;
      const filePath = `/${Date.now()}/${image.originalname}`;
      const uploadResponse = await this.imagekit.uploadFile(
        image,
        filePath,
        folderPath,
      );

      const lowQualityUrl = this.imagekit.generateUrl(
        uploadResponse.filePath,
        '10',
      );

      const mediumQualityUrl = this.imagekit.generateUrl(
        uploadResponse.filePath,
        '50',
      );

      const highQualityUrl = this.imagekit.generateUrl(
        uploadResponse.filePath,
        '100',
      );
      product.Image.push({
        imageName: ImageName,
        lowUrl: lowQualityUrl,
        mediumUrl: mediumQualityUrl,
        highUrl: highQualityUrl,
        fileId: uploadResponse.fileId,
      });
      const result = await product.save();
      return res.status(200).json({
        message: 'Image uploaded successfully',
        data: result,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
