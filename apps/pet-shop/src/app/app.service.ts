import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello Pet Shop' };
  }

  getMyData(): { message: string } {
    return { message: 'Hello from My Pet Shop' };
  }
}
