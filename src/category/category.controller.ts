import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'get_all_cate' })
  async getAll() {
    return await this.categoryService.getAll();
  }

  @MessagePattern({ cmd: 'create_cate' })
  async create(data: CreateCategoryDto) {
    return await this.categoryService.create(data);
  }

  @MessagePattern({ cmd: 'update_cate' })
  async update(data: UpdateCategoryDto) {
    return await this.categoryService.update(data.id, data.name);
  }

  @MessagePattern({ cmd: 'delete_cate' })
  async delete(data: { id: number }) {
    return await this.categoryService.deleteById(data.id);
  }

  @MessagePattern({ cmd: 'get_cate' })
  async getCate(data: { id: number }) {
    return await this.categoryService.getById(data.id);
  }
}
