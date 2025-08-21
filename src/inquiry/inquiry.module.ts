import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from 'src/entities/inquiry.entity';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Inquiry])], // Register the Trek entity here
  providers: [InquiryService],
  controllers: [InquiryController],
})
export class InquiryModule {}
