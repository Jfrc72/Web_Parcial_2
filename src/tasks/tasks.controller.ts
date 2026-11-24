import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
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
