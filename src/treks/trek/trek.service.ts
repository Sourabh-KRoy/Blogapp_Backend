import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trek } from 'src/entities/trek.entity';

@Injectable()
export class TrekService {
    constructor(
        @InjectRepository(Trek) // Inject the Trek repository here
        private readonly trekRepository: Repository<Trek>,
    ) { }

    async create(data: Partial<Trek>): Promise<Trek> {
        return this.trekRepository.save(data);
    }

    findAll(): Promise<Trek[]> {
        return this.trekRepository.find();
    }
    
    async update(id: number, data: Partial<Trek>): Promise<any> {
        return this.trekRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.trekRepository.delete(id);
    }
}
