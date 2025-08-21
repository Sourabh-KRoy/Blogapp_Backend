import { Controller, Post, Get, Body, Patch, Param, Query, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from '../entities/story.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', { // Use FileInterceptor for a single file
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `thumbnail-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createStory(
    @Body() createStoryDto: { title: string; description: string; content: string; pageName: string; status?: 'draft' | 'published'; bannerIds?: string[] },
    @UploadedFile() file: Express.Multer.File, // Handle the uploaded file
  ): Promise<Story> {
    console.log('File:', file); // Log the file to debug
    const { title, description, content, pageName, status, bannerIds } = createStoryDto;
    const thumbnail = file ? file.filename : null; // Check if file is uploaded and get filename
    console.log('Thumbnail:', thumbnail); // Log thumbnail to debug
    console.log('Banner IDs:', bannerIds);

    return this.storyService.createStory(title, description, content, pageName, status ?? 'draft', bannerIds ?? [], thumbnail);
  }
  
  
  @Patch('edit/:id')
  @UseInterceptors(
    FileInterceptor('thumbnail', { // Use FileInterceptor for a single file
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `thumbnail-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateStory(
    @Param('id') id: string,
    @Body() updateStoryDto: { title?: string; description?: string; content?: string; pageName?: string; thumbnail?: string; bannerIds?: string[] },
    @UploadedFile() file?: Express.Multer.File, // Handle the uploaded file
  ): Promise<Story> {
    const thumbnail = file ? file.filename : updateStoryDto.thumbnail;
    console.log('Thumbnail:', thumbnail); // Log thumbnail to debug
    return this.storyService.updateStory(id, { ...updateStoryDto, thumbnail }, updateStoryDto.bannerIds);
  }
  

  @Get('storyId/:id')
  async getStoryById(@Param('id') id: string): Promise<Story> {
    return this.storyService.getStoryById(id);
  }

  @Get('')
  async getPublishedStories(): Promise<Story[]> {
    return this.storyService.getPublishedStories();
  }

  @Get('all')
  async getAllStories(): Promise<Story[]> {
    return this.storyService.getAllStories();
  }

  @Delete(':id')
  async deleteStory(@Param('id') id: string): Promise<{ message: string }> {
    await this.storyService.deleteStory(id);
    return { message: `Story with ID ${id} deleted successfully.` };
  }

  @Patch('publish/:id')
  async publishStory(@Param('id') id: string): Promise<Story> {
    return this.storyService.changeStoryStatus(id, 'published');
  }
}
