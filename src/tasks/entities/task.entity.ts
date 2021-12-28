import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiPropertyOptional()
  completed: boolean;

  @Column()
  @ApiProperty()
  dateCreated: Date;

  @ApiPropertyOptional()
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

  constructor(task?: Partial<Task>) {
    this.id = task?.id;
    this.description = task?.description;
    this.completed = task?.completed;
    this.dateCreated = task?.dateCreated;
    this.dateCompleted = task?.dateCompleted;
  }
}
