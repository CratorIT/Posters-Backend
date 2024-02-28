import { Injectable } from '@nestjs/common';
import { ImagekitService } from './imagekit/imagekit.service';

@Injectable()
export class AppService {
  constructor(private imagekitService: ImagekitService) {}
  getHello(): string {
    return 'Hello In The World Of Posters Backend!';
  }
}
