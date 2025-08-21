import { Controller, Post, Body, Get, Query, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Inquiry } from 'src/entities/inquiry.entity';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/roles.enum';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    async createCategory(@Body() data: Partial<Inquiry>) {
        return this.categoryService.createCategory(data);
    }

    @Get()
    @Roles(Role.User, Role.Admin)
    async findAll() {
        return this.categoryService.findAll();
    }
}
