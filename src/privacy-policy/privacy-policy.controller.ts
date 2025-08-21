import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PrivacyService } from './privacy-policy.service';
import { Privacy } from 'src/entities/privacy-policy.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/roles.enum';

@Controller('privacy-policy')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrivacyPolicyController {
  constructor(private readonly privacyService: PrivacyService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() privacy: Partial<Privacy>): Promise<Privacy> {
    return this.privacyService.create(privacy);
  }

  @Get()
  findAll(): Promise<Privacy[]> {
    return this.privacyService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string): Promise<Privacy> {
    return this.privacyService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles( Role.Admin)
  update(@Param('id') id: string, @Body() privacy: Partial<Privacy>): Promise<Privacy> {
    return this.privacyService.update(id, privacy);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.privacyService.remove(id);
  }
}
