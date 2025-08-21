import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { Blog } from 'src/entities/blog.entity';
import { Trek } from 'src/entities/trek.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Trek]),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
