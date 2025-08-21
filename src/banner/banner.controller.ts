import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BannerService } from './banner.service';
import { Response } from 'express';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Upload folder
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadBanner(
    @Body('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const banner = await this.bannerService.createBanner(name, file);
    return banner;
  }

  @Get()
  async getAllBanners() {
    return this.bannerService.getBanners();
  }

}
