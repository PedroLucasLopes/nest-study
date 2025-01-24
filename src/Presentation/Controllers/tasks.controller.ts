import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDTO } from 'src/Application/Dto/CreateTask.dto';
import { UpdateTaskDTO } from 'src/Application/Dto/UpdateTask';
import { TasksService } from 'src/Application/Service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findTaskById(id);
  }

  @Post()
  postTasks(@Body() body: CreateTaskDTO) {
    return this.tasksService.createTask(body);
  }

  @Patch(':id')
  patchTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDTO,
  ) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
