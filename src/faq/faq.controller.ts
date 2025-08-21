import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { FaqService } from './faq.service';
import { Faq } from 'src/entities/faq.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/roles.enum';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() faq: Partial<Faq>): Promise<Faq> {
    return this.faqService.create(faq);
  }

  @Get()
  findAll(): Promise<Faq[]> {
    return this.faqService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string): Promise<Faq> {
    return this.faqService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() faq: Partial<Faq>): Promise<Faq> {
    return this.faqService.update(id, faq);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.faqService.remove(id);
  }
}
