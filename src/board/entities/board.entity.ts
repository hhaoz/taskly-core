import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { timestamp } from 'rxjs';
import { User } from '../../user/entities/user.entity';
import { Task } from '../../task/entities/task.entity';
import { PrimaryColumn } from 'typeorm';
import { BoardLabel } from '../../board_label/entities/board_label.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('timestamptz')
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.ownedBoards, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany(() => BoardLabel, (boardLabel) => boardLabel.board)
  labels: BoardLabel[];

  @ManyToMany(() => User, (user) => user.joinedBoards)
  members: User[];
}
