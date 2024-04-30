import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getHomeProductStats() {
    const totalProduct = await this.prisma.product.count();
    const totalStocks = await this.prisma.product.aggregate({
      _sum: {
        stock: true,
      },
    });

    return {
      totalProduct,
      totalStocks: totalStocks._sum.stock || 0,
    };
  }
}
