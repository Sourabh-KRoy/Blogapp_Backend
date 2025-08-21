import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from 'src/entities/about.entity';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  create(@Body() about: Partial<About>): Promise<About> {
    return this.aboutService.create(about);
  }

  @Get()
  findAll(): Promise<About[]> {
    return this.aboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<About> {
    return this.aboutService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() about: Partial<About>): Promise<About> {
    return this.aboutService.update(id, about);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.aboutService.remove(id);
  }
}
