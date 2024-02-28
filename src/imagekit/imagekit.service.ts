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
}
