import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany();
  }

  async getById(id: number) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    if (await this.getByName(createCategoryDto.name)) {
      throw new RpcException(new ConflictException('Danh mục này đã tồn tại'));
    }
    return await this.prisma.category.create({
      data: { name: createCategoryDto.name },
    });
  }

  async update(id: number, name: string) {
    if (await this.getByName(name)) {
      throw new RpcException(new ConflictException('Danh mục này đã tồn tại'));
    }
    return await this.prisma.category.update({
      where: { id },
      data: { name: name },
    });
  }

  async getByName(name: string) {
    return await this.prisma.category.findUnique({ where: { name } });
  }

  async deleteById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!category) {
      throw new RpcException(new ConflictException('Không tìm thấy danh mục!'));
    }
    if (category.products.length > 0) {
      throw new RpcException(
        new ForbiddenException('Danh mục này đang chứa các sản phẩm!'),
      );
    }

    return await this.prisma.category.delete({ where: { id } });
  }
}
