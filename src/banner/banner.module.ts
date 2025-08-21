import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { Banner } from 'src/entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
