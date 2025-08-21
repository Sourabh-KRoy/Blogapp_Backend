import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from 'src/entities/faq.entity';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<Faq>,
  ) {}

  async create(faq: Partial<Faq>): Promise<Faq> {
    const newFaq = this.faqRepository.create(faq);
    return this.faqRepository.save(newFaq);
  }

  async findAll(): Promise<Faq[]> {
    return this.faqRepository.find();
  }

  async findOne(id: string): Promise<Faq> {
    // Adjust based on TypeORM version
    const faq = await this.faqRepository.findOneBy({ id });
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return faq;
  }

  async update(id: string, faq: Partial<Faq>): Promise<Faq> {
    await this.faqRepository.update(id, faq);
    const updatedFaq = await this.faqRepository.findOneBy({ id });
    if (!updatedFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return updatedFaq;
  }

  async remove(id: string): Promise<void> {
    const result = await this.faqRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
  }
}
