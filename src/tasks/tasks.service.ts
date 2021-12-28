import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepo.create(createTaskDto);
    return this.taskRepo.save(task);
  }

  async findAll() {
    return await this.taskRepo.find({
      order: {
        dateCreated: 'DESC',
        id: 'DESC',
      },
    });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.taskRepo.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    this.findOneOrFail(id);
    return await this.taskRepo.update(id, updateTaskDto);
  }

  async remove(id: string) {
    this.findOneOrFail(id);
    await this.taskRepo.delete(id);
  }
}
