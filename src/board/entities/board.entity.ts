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

@Entity()
export class Board {
  @PrimaryColumn('uuid')
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

  @ManyToMany(() => User, (user) => user.joinedBoards)
  members: User[];
}
