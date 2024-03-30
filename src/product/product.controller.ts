import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { UpdateProductServiceDto } from './dtos/updateProductService.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @MessagePattern({ cmd: 'get_product' })
  async get(data: { page: number; search?: string }) {
    return this.productService.get(data.page, data.search);
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  async GetProduct(data: { id: number }) {
    return await this.productService.getById(data.id);
  }

  @MessagePattern({ cmd: 'create_product' })
  async create(data: CreateProductDto) {
    return await this.productService.create(data);
  }

  @MessagePattern({ cmd: 'update_product' })
  async update(data: any) {
    const updateProductServiceDto = new UpdateProductServiceDto(
      data.name,
      data.image,
      data.status,
      data.importPrice,
      data.exportPrice,
      data.discount,
      data.categoryId,
    );
    return await this.productService.update(data.id, updateProductServiceDto);
  }
}
