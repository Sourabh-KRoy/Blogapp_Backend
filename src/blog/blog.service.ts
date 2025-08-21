import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async createBlog(title: string, description: string, categoryName: string): Promise<Blog> {
        const category = await this.categoryRepository.findOne({ where: { name: categoryName } });
        if (!category) {
            throw new Error('Category not found');
        }
        const blog = this.blogRepository.create({ title, description, category });
        return this.blogRepository.save(blog);
    }

    async findByQueryParams(categories?: string[], keywords?: string[]): Promise<Blog[]> {
        const query = this.blogRepository.createQueryBuilder('blog')
            .leftJoinAndSelect('blog.category', 'category');

        if (categories && categories.length > 0) {
            query.andWhere('category.name IN (:...categories)', { categories });
        }

        if (keywords && keywords.length > 0) {
            const keywordConditions = keywords.map(keyword => `
                blog.title LIKE :keyword OR
                blog.description LIKE :keyword
            `).join(' OR ');

            query.andWhere(`(${keywordConditions})`, { keyword: `%${keywords.join('%')}%` });
        }

        return query.getMany();
    }
}

