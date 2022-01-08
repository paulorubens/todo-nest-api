import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const taskList: Task[] = [
  new Task({ id: '1', description: 'task 1', completed: true }),
  new Task({ id: '2', description: 'task 2', completed: true }),
  new Task({ id: '3', description: 'task 3', completed: true }),
];

const newTask: Task = new Task({ description: 'task 1', completed: false });

describe('TasksController', () => {
  let taskController: TasksController;
  let taskService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue(newTask),
            findAll: jest.fn().mockResolvedValue(taskList),
            findOneOrFail: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    taskController = module.get<TasksController>(TasksController);
    taskService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
    expect(taskService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a task list entity successfully', async () => {
      // Arrange

      // Act
      const result = await taskController.findAll();

      // Assert
      expect(result).toEqual(taskList);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(taskService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new task item successfully', async () => {
      // Arrange
      const body: CreateTaskDto = {
        description: 'task 1',
        completed: false,
        dateCreated: new Date(),
        dateCompleted: null,
      };

      // Act
      const result = await taskController.create(body);

      // Assert
      expect(result).toEqual(newTask);
    });

    it('should throw an exception', async () => {
      // Arrange
      const body: CreateTaskDto = {
        description: 'task 1',
        completed: false,
        dateCreated: new Date(),
        dateCompleted: null,
      };

      jest.spyOn(taskService, 'create').mockRejectedValueOnce(new Error());
      // Act

      // Assert
      expect(taskController.create(body)).rejects.toThrowError();
    });
  });
});
