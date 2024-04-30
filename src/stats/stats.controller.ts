import { Controller } from '@nestjs/common';
import { StatsService } from './stats.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('stats')
export class StatsController {
  constructor(private statService: StatsService) {}

  @MessagePattern({ cmd: 'get_product_stats' })
  async getHomeProductStats(data) {
    return await this.statService.getHomeProductStats();
  }
}
