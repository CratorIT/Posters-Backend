import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ImagekitService } from './imagekit/imagekit.service';
import { ProductsModule } from './products/products.module';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), MongooseModule.forRoot(process.env.MONGODB_URI), ProductsModule, AuthUserModule],
  controllers: [AppController],
  providers: [AppService, ImagekitService],
})
export class AppModule {}
