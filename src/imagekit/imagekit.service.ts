import { Injectable } from '@nestjs/common';
var ImageKit = require('imagekit');

@Injectable()
export class ImagekitService {
  private imagekit: any;

  constructor() {

    this.imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }

  getInstance() {
    return this.imagekit;
  }


  async uploadFile(file: Express.Multer.File,fileName,folderName) {
    const result = await this.imagekit.upload({
      file: file.buffer,
      fileName: fileName, 
      folder: folderName,
    });
    return result;
  }

  generateUrl(filePath: string, quality: string) {
    const url = this.imagekit.url({
      path: filePath,
      transformation: [
        {
          quality: quality,
        },
      ],
    });

    return url;
  }

}
