import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  private readonly tasksMemory: Task[] = [];

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    const createdTask = await this.tasksService.create(dto);
    this.tasksMemory.push(createdTask);
    return createdTask;
  }

  @Get()
  findAll() {
    return this.tasksMemory;
  }

  @Get('priority/:id')
  // Así el pipe recibe el texto de la URL antes de que se convierta a número.
  async findByPriority(@Param('id', ParseIntPipe) id: unknown) {
    return this.tasksService.findByPriority(id as number);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }
}
