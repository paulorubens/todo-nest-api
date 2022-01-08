import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllTaskSwagger } from './swagger/findall-task.swagger';
import { CreateTaskSwagger } from './swagger/create-task.swagger';
import { FindTaskSwagger } from './swagger/find-task.swagger';
import { UpdateTaskSwagger } from './swagger/update-task.swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova tarefa' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Nota tarefa criada com sucesso',
    type: CreateTaskSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parâmetros inválidos',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tarefas retornada com sucesso',
    type: FindAllTaskSwagger,
    isArray: true,
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir informações de uma tarefa' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dados da tarefa retornados com sucesso',
    type: FindTaskSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarefa não encontrada',
  })
  findOneOrFail(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.findOneOrFail(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Alterar os dados de uma tarefa' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarefa atualizada com sucesso',
    type: UpdateTaskSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarefa não encontrada',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma tarefa' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Tarefa removida com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarefa não encontrada',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.tasksService.remove(id);
  }
}
