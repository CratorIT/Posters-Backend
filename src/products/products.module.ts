import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './Schema/product.schema';
import { ImagekitService } from 'src/imagekit/imagekit.service';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService,ImagekitService],
})
export class ProductsModule {}
