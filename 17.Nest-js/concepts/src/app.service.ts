import { Injectable } from '@nestjs/common';

//decorator
//business logic is implemented here
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest Js!';
  }
}
