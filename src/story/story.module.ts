import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { Story } from 'src/entities/story.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryService } from './story.service';
import { Banner } from 'src/entities/banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Banner])],
  controllers: [StoryController],
  providers: [StoryService]

})
export class StoryModule {}
