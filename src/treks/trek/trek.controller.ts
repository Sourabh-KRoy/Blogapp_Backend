import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrekService } from './trek.service';
import { Trek } from 'src/entities/trek.entity';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/roles.enum';

@Controller('treks')
export class TrekController {
  constructor(private readonly trekService: TrekService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() data: Partial<Trek>) {
    return this.trekService.create(data);
  }

  @Get()
  getAll() {
    return this.trekService.findAll();
  }
}
