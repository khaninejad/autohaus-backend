import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/jwt-auth.guard';
import { TrackHistoryService } from './track_history.service';

@Controller('api/history')
export class TrackHistoryController {
  constructor(private readonly trackHistoryService: TrackHistoryService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.trackHistoryService.findByEmployee(id);
  }
}
