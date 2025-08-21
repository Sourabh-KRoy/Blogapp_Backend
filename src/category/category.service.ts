import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async createCategory(category: Partial<Category>): Promise<Category> {
       
        const newCategory = this.categoryRepository.create(category);
        return this.categoryRepository.save(newCategory);
    }


    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findByName(name: string): Promise<Category> {
        return this.categoryRepository.findOne({ where: { name } });
    }
}
