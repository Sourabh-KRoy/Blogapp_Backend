import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Privacy } from 'src/entities/privacy-policy.entity';

@Injectable()
export class PrivacyService {
  constructor(
    @InjectRepository(Privacy)
    private privacyRepository: Repository<Privacy>,
  ) {}

  async create(privacy: Partial<Privacy>): Promise<Privacy> {
    const newPrivacy = this.privacyRepository.create(privacy);
    return this.privacyRepository.save(newPrivacy);
  }

  async findAll(): Promise<Privacy[]> {
    return this.privacyRepository.find();
  }

  async findOne(id: string): Promise<Privacy> {
    const privacy = await this.privacyRepository.findOneBy({ id });
    if (!privacy) {
      throw new NotFoundException(`Privacy with ID ${id} not found`);
    }
    return privacy;
  }


  async update(id: string, privacy: Partial<Privacy>): Promise<Privacy> {
    await this.privacyRepository.update(id, privacy);
    const updatedPrivacy = await this.privacyRepository.findOneBy({ id });
    if (!updatedPrivacy) {
      throw new NotFoundException(`Privacy with ID ${id} not found`);
    }
    return updatedPrivacy;
  }

  async remove(id: string): Promise<void> {
    await this.privacyRepository.delete(id);
  }
}
