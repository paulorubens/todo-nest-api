import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;

  @Column()
  dateCreated: Date;

  @Column()
  dateCompleted: Date;

  @BeforeInsert()
  generateId() {
    this.completed = false;
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }
}
