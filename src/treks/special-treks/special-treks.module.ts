import { Module } from '@nestjs/common';
import { SpecialTreksService } from './special-treks.service';

@Module({
  providers: [SpecialTreksService]
})
export class SpecialTreksModule {}
