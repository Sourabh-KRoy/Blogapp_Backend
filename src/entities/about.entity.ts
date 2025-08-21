import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class About {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
