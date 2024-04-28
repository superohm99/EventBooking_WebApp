import { Injectable } from '@nestjs/common';
import { Public } from './users/common/decorators/src/common/decorators';


@Public()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Test';
  }
}
