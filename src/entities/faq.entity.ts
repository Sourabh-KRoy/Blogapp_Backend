import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;
  
}
