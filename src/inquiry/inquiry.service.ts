import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from 'src/entities/inquiry.entity';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
  ) {}

  async create(inquiry: Partial<Inquiry>): Promise<Inquiry> {
    const newInquiry = this.inquiryRepository.create(inquiry);
    return this.inquiryRepository.save(newInquiry);
  }

  async findAll(): Promise<Inquiry[]> {
    return this.inquiryRepository.find();
  }

  async findOne(id: string): Promise<Inquiry> {
    const inquiry = await this.inquiryRepository.findOneBy({ id });
    if (!inquiry) {
      throw new NotFoundException(`inquiry with ID ${id} not found`);
    }
    return inquiry;
  }


  async update(id: string, inquiry: Partial<Inquiry>): Promise<Inquiry> {
    await this.inquiryRepository.update(id, inquiry);
    const updatedInquiry = await this.inquiryRepository.findOneBy({ id });
    if (!updatedInquiry) {
      throw new NotFoundException(`inquiry with ID ${id} not found`);
    }
    return updatedInquiry;
  }

  async remove(id: string): Promise<void> {
    await this.inquiryRepository.delete(id);
  }
}
