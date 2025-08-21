import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Trek } from '../entities/trek.entity';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Trek)
    private readonly trekRepository: Repository<Trek>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}z

  async search(query: string, filters: any): Promise<any> {
    const trekWhereClause: any = [
      { name: Like(`%${query}%`) },
      { description: Like(`%${query}%`) },
      { location: Like(`%${query}%`) },
    ];

    if (filters.location) {
      trekWhereClause.push({ location: filters.location });
    }

    const trekResults = await this.trekRepository.find({
      where: trekWhereClause,
    });

    const blogWhereClause: any = [
      { title: Like(`%${query}%`) },
      { description: Like(`%${query}%`) },
    ];

    if (filters.category) {
      blogWhereClause.push({ category: { name: filters.category } });
    }

    const blogResults = await this.blogRepository.find({
      where: blogWhereClause,
      relations: ['category'],
    });

    const trekFilters = this.extractFilters(trekResults, ['location']);
    const blogFilters = this.extractFilters(blogResults, ['category']);

    return {
      treks: trekResults,
      blogs: blogResults,
      filters: {
        treks: trekFilters,
        blogs: blogFilters,
      },
    };
  }

  private extractFilters(results: any[], filterFields: string[]): any {
    const filters = {};
    filterFields.forEach((field) => {
      if (field === 'category') {
        filters[field] = [
          ...new Set(
            results.map((result) =>
              result.category ? { id: result.category.id, name: result.category.name } : null
            )
          ),
        ].filter(Boolean);
      } else {
        filters[field] = [...new Set(results.map((result) => result[field]))];
      }
    });
    return filters;
  }
}
