import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
  async findByPriority(@Param('id') id: number) {
    return this.tasksService.findByPriority(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }
}
