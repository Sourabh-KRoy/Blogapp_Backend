import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Privacy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
