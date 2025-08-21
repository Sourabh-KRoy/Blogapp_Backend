// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity here
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export the UserService if needed in other modules
})
export class UserModule {}
