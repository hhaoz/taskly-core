import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from '../../card/entities/card.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Card, (card) => card.task)
  cards: Card[];
}
