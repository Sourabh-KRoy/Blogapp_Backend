import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // Auto-generated primary key

  @Column()
  name: string;  // Banner name

  @Column()
  images: string;  // Path to the image file
}
