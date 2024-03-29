import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  @EventPattern('test')
  async test(data: any) {
    console.log(data);
  }
}
