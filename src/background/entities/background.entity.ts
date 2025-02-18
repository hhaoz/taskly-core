import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../../board/entities/board.entity';

@Entity()
export class Background {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  color?: string;

  @Column('text')
  fileName?: string;

  @Column('text')
  fileLocation?: string;

  // @Column('boolean')
  // isPredefined: boolean;
}
