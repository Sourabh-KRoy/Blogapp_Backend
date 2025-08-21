import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('q') query: string, @Query('filters') filters: string) {
    if (!query || query.trim() === '') {
      return { error: 'Query parameter `q` is required' };
    }

    // Parse filters from query params if provided
    const parsedFilters = filters ? JSON.parse(filters) : {};

    return this.searchService.search(query, parsedFilters);
  }
}
