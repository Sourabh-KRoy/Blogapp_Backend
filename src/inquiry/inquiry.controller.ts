import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InquiryService, } from './inquiry.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Inquiry } from 'src/entities/inquiry.entity';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/roles.enum';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) { }

  @Post()
  create(@Body() data: Partial<Inquiry>) {
    return this.inquiryService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAll() {
    return this.inquiryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string): Promise<Inquiry> {
    return this.inquiryService.findOne(id);
  }
}