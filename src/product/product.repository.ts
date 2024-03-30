import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/category/dtos/createCategory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductServiceDto } from './dtos/updateProductService.dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async create(data: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        image: data.image,
        importPrice: data.importPrice,
        exportPrice: data.exportPrice,
        discount: data.discount,
        categoryId: data.categoryId,
      },
    });
  }

  async update(id: number, data: UpdateProductServiceDto) {
    return await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image,
        status: data.status,
        importPrice: data.importPrice,
        exportPrice: data.exportPrice,
        discount: data.discount,
        categoryId: data.categoryId,
      },
    });
  }
}
