// trek.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trek } from 'src/entities/trek.entity';
import { TrekService } from './trek.service';
import { TrekController } from './trek.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trek])], // Register the Trek entity here
  providers: [TrekService],
  controllers: [TrekController],
})
export class TrekModule {}
