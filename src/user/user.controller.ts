import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, ParseIntPipe, Put, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/roles.enum';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Admin } from 'typeorm';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @Get()
    // findAll(): Promise<User[]> {
    //     return this.userService.findAll();
    // }

    @Get('vendor')
    findVendors(): Promise<User[]> {
        return this.userService.findByRole(Role.Vendor);
    }

    @Get('user')
    findUsers(): Promise<User[]> {
        return this.userService.findByRole(Role.User);
    }


    @Get('user/:id')
    @Roles(Role.Admin, Role.Vendor)
    findOne(@Param('id', ParseIntPipe) id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put('update/:id')
    @Roles(Role.Admin, Role.User, Role.Vendor)
    async update(
        @Param('id', ParseIntPipe) id: string,
        @Body() updateUserDto: Partial<User>,
        @Request() req: any
    ): Promise<User> {

        console.log('Request User:', req.user);
        const currentUser = req.user; // User making the request

        const userToUpdate = await this.userService.findOne(id);
        if (!userToUpdate) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // // Retrieve the user to be updated
        // const userToUpdate = await this.userService.findOne(id);

        // If role change is attempted, throw an error
        if (updateUserDto.role && updateUserDto.role !== userToUpdate.role) {
            throw new ForbiddenException('Role cannot be changed once it is defined');
        }

        // If the current user is a User or Vendor and is trying to update their own details
        if (currentUser.userId === id) {
            // Users and Vendors can only update their own details
            return this.userService.update(id, updateUserDto);
        }

        // If the current user is an Admin
        if (currentUser.role === Role.Admin) {
            // Admins can update user details but cannot change roles
            return this.userService.update(id, updateUserDto);
        }

        console.log('Current User ID:', currentUser.id);
        console.log('Requested Update User ID:', id);
        console.log('Update Payload:', updateUserDto);

        // Users and Vendors cannot update other users
        throw new ForbiddenException('You do not have permission to perform this action');
    }
}