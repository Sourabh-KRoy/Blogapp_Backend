// user.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/roles/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // findAll(): Promise<User[]> {
  //   return this.userRepository.find();
  // }

  findByRole(role: Role): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
  
  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    console.log('Updating user with ID:', id); // Log the ID being updated

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    console.log('User found:', user); // Log the found user

    // Prevent role updates
    if (updateUserDto.role) {
      throw new ForbiddenException('Role changes are not allowed');
    }

    // If password is being updated, hash it before saving
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }


  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(email: string, password: string, role: Role): Promise<User> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string, role: Role): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && user.role === role && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

}
