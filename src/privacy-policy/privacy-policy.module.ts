import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privacy } from 'src/entities/privacy-policy.entity'; // Ensure this path is correct
import { PrivacyService } from './privacy-policy.service';
import { PrivacyPolicyController } from './privacy-policy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Privacy])],
  providers: [PrivacyService],
  controllers: [PrivacyPolicyController],
})
export class PrivacyPolicyModule {}
