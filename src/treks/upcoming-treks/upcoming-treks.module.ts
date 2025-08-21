import { Module } from '@nestjs/common';
import { UpcomingTreksController } from './upcoming-treks.controller';

@Module({
  controllers: [UpcomingTreksController]
})
export class UpcomingTreksModule {}
