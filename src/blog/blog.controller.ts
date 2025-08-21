import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Role } from 'src/common/roles/roles.enum';
import { Roles } from 'src/common/roles/roles.decorator';

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User, Role.Admin)
    async createBlog(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('categoryName') categoryName: string
    ) {
        return this.blogService.createBlog(title, description, categoryName);
    }

    @Get()
    async findAll(
        @Query('category') category?: string | string[],
        @Query('q') q?: string | string[]
    ) {
        // Convert to array if a single string is received
        const categoriesArray = Array.isArray(category) ? category : category ? [category] : undefined;
        const keywordsArray = Array.isArray(q) ? q : q ? [q] : undefined;

        return this.blogService.findByQueryParams(categoriesArray, keywordsArray);
    }

}


