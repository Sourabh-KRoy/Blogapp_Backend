import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Banner } from './banner.entity'; // Adjust the import path as needed

@Entity()
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ unique: true })
  pageName: string;

  @Column() // Thumbnail is optional
  thumbnail: string; // Store the thumbnail image path or URL

  @Column({ default: 'draft' })
  status: 'draft' | 'published';

  @ManyToMany(() => Banner, { cascade: true, eager: true })
  @JoinTable() // Creates a join table for many-to-many relationship
  banners: Banner[];
}
