import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from 'src/entities/about.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  async create(about: Partial<About>): Promise<About> {
    const newAbout = this.aboutRepository.create(about);
    return this.aboutRepository.save(newAbout);
  }

  async findAll(): Promise<About[]> {
    return this.aboutRepository.find();
  }

  async findOne(id: string): Promise<About> {
    // Adjust based on TypeORM version
    const about = await this.aboutRepository.findOneBy({ id });
    if (!about) {
      throw new NotFoundException(`About with ID ${id} not found`);
    }
    return about;
  }

  async update(id: string, about: Partial<About>): Promise<About> {
    await this.aboutRepository.update(id, about);
    const updatedAbout = await this.aboutRepository.findOneBy({ id });
    if (!updatedAbout) {
      throw new NotFoundException(`About with ID ${id} not found`);
    }
    return updatedAbout;
  }

  async remove(id: string): Promise<void> {
    await this.aboutRepository.delete(id);
  }
}
