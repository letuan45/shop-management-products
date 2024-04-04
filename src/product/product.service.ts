import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dtos/createProduct.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductServiceDto } from './dtos/updateProductService.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private prisma: PrismaService,
  ) {}

  pageLimit = 10;

  async get(page: number, search?: string) {
    const skip = this.pageLimit * (page - 1);
    let where = {};
    if (search) {
      where = {
        name: { contains: search },
      };
    }

    const data = await this.prisma.product.findMany({
      take: this.pageLimit,
      skip: skip,
      where: where,
      orderBy: { id: 'desc' },
    });

    const count = await this.prisma.product.count({ where: where });

    return {
      data,
      total: count,
    };
  }

  async create(data: CreateProductDto) {
    return await this.productRepository.create(data);
  }

  async getById(id: number) {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new RpcException(new NotFoundException('Không tìm thấy sản phẩm'));
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductServiceDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async increaseStock(id: number, quantity: number) {
    const product = await this.getById(id);
    return await this.productRepository.updateStock(
      product.id,
      product.stock + quantity,
    );
  }
}
