import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';
import { join } from 'path';

@Injectable()
export class BannerService {
  private readonly baseUrl = 'http://localhost:3000/';

  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  async createBanner(name: string, file: Express.Multer.File): Promise<Banner> {
    const imageUrl = `uploads/${file.filename}`;
  
    // Create a new banner entity with the given name and image URL
    const banner = this.bannerRepository.create({
      name,
      images: imageUrl,
    });
  
    // Save banner to the database
    await this.bannerRepository.save(banner);
  
    return banner;
  }
  
  async getBanners(): Promise<Banner[]> {
    const banners = await this.bannerRepository.find();
   
    return banners.map(banner => ({
      ...banner,
      images: this.baseUrl + banner.images.replace(/\\/g, '/'), // Ensure the path is correct
    }));
  }
  
}
