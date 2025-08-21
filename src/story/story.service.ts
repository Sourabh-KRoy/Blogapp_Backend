import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/story.entity';
import { Banner } from '../entities/banner.entity'; // Ensure this import path is correct
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StoryService {
  private readonly baseUrl = 'http://localhost:3000/'; // Replace with your actual base URL

  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  async createStory(
    title: string,
    description: string,
    content: string,
    pageName: string,
    status: 'draft' | 'published',
    bannerIds: string[] = [], // Array of banner IDs
    thumbnail: string | null, // Single thumbnail path
  ): Promise<Story> {
    // Find banners by their IDs
    const banners = await this.bannerRepository.findByIds(bannerIds);
    const story = this.storyRepository.create({ title, description, content, pageName, status, banners, thumbnail });
    console.log('Banner IDs:', bannerIds);

    console.log('Story to be saved:', story); // Log the story to debug
    return this.storyRepository.save(story);
  }
  

  async updateStory(
    id: string,
    updateStoryDto: { title?: string; description?: string; content?: string; pageName?: string; thumbnail?: string },
    bannerIds?: string[], // Array of banner IDs
  ): Promise<Story> {
    const story = await this.findStoryById(id);
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found.`);
    }

    story.title = updateStoryDto.title ?? story.title;
    story.description = updateStoryDto.description ?? story.description;
    story.content = updateStoryDto.content ?? story.content;
    story.pageName = updateStoryDto.pageName ?? story.pageName;
    story.thumbnail = updateStoryDto.thumbnail ?? story.thumbnail;

    if (bannerIds) {
      // Update banners
      const banners = await this.bannerRepository.findByIds(bannerIds);
      story.banners = banners;
    }

    return this.storyRepository.save(story);
  }

  async getStoryById(id: string): Promise<Story> {
    const story = await this.storyRepository.findOne({ where: { id }, relations: ['banners'] });
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found.`);
    }
    return {
      ...story,
      thumbnail: story.thumbnail ? this.baseUrl + 'uploads/' + story.thumbnail.replace(/\\/g, '/') : null,
      banners: story.banners.map(banner => ({
        id: banner.id,
        name: banner.name,
        images: this.baseUrl  + banner.images.replace(/\\/g, '/'), // Single image path
      })),
    };
  }

  async findStoryById(id: string): Promise<Story | null> {
    return this.storyRepository.findOne({ where: { id }, relations: ['banners'] });
  }

  async getPublishedStories(): Promise<Story[]> {
    const stories = await this.storyRepository.find({ where: { status: 'published' }, relations: ['banners'] });
    return stories.map(story => ({
      ...story,
      thumbnail: story.thumbnail ? this.baseUrl + 'uploads/' + story.thumbnail.replace(/\\/g, '/') : null,
      banners: story.banners.map(banner => ({
        id: banner.id,
        name: banner.name,
        images: this.baseUrl + banner.images.replace(/\\/g, '/'), // Single image path
      })),
    }));
  }

  async getAllStories(): Promise<Story[]> {
    // Retrieve all stories with related banners
    const stories = await this.storyRepository.find({ relations: ['banners'] });
  
    // Map over each story to transform it
    return stories.map(story => ({
      ...story,
      thumbnail: story.thumbnail ? this.baseUrl + 'uploads/' + story.thumbnail.replace(/\\/g, '/') : null,
      banners: story.banners.map(banner => ({
        id: banner.id,
        name: banner.name,
        images: this.baseUrl + banner.images.replace(/\\/g, '/'), // Single image path
      })),
    }));
  }
  

  async deleteStory(id: string): Promise<void> {
    const story = await this.findStoryById(id);
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found.`);
    }

    // Delete thumbnail from the filesystem
    if (story.thumbnail) {
      this.deleteImages([story.thumbnail]);
    }

    // Delete story from the database
    const result = await this.storyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Story with ID ${id} not found.`);
    }
  }

  async changeStoryStatus(id: string, status: 'draft' | 'published'): Promise<Story> {
    const story = await this.findStoryById(id);
    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found.`);
    }

    if (story.status === 'draft' && status === 'published') {
      story.status = status;
    } else if (story.status === 'published') {
      throw new Error('You cannot change a published story back to draft.');
    }

    return this.storyRepository.save(story);
  }

  private deleteImages(images: string[]): void {
    const uploadsDir = path.join(__dirname, '..', '..', '..', 'uploads');
    images.forEach(image => {
      const imagePath = path.join(uploadsDir, image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.error(`Image not found: ${imagePath}`);
          } else {
            console.error(`Failed to delete image: ${imagePath}`, err);
          }
        } else {
          console.log(`Deleted image: ${imagePath}`);
        }
      });
    });
  }
}
