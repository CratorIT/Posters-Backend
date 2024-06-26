import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Response } from 'express';
import { AdminAuthGuard } from 'src/auth-user/guards/auth.guards';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/admin/addProduct')
  // @UseGuards(AdminAuthGuard)
  // @UseInterceptors(FileFieldsInterceptor([{name:"image",maxCount:3}]))
  addProduct(
    // @UploadedFiles() files: { image?: Express.Multer.File[]},
    @Body() body: any,
    @Res() res: Response,
  ) {
    return this.productsService.addProduct(body, res);
  }

  @Get('/getAllProducts')
  getAllProducts(@Res() res: Response) {
    return this.productsService.getAllProducts(res);
  }

  @Post('/admin/uploadProductImage')
  @UseInterceptors(FileInterceptor('image'))
  uploadProductImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: any,
    @Res() res: Response,
  ) {
    return this.productsService.uploadProductImage(image, body, res);
  }
}
