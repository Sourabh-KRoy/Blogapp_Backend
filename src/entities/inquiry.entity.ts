import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  message: string;

}
