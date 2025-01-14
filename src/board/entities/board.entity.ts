import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { timestamp } from 'rxjs';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('timestamptz')
  createdAt: Date;

  @Column('boolean')
  is_public: boolean;
}
