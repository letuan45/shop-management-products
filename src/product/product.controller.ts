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
  async get(data: {
    page: number;
    search?: string;
    pageSize?: number;
    isForSell?: string;
  }) {
    const isForSell: boolean = data.isForSell === 'true' ? true : false;
    return await this.productService.get(
      data.page,
      data.search,
      data.pageSize,
      isForSell,
    );
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

  @MessagePattern({ cmd: 'increase_stock' })
  async increaseStock(data: { id: number; quantity: number }) {
    return await this.productService.increaseStock(data.id, data.quantity);
  }

  @MessagePattern({ cmd: 'minus_products_stock' })
  async minnusProductsStock(data: {
    items: { productId: number; quantity: number }[];
  }) {
    return await this.productService.minusStock(data.items);
  }
}
