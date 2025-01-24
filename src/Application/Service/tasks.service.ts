import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../Dto/CreateTask.dto';
import { UpdateTaskDTO } from '../Dto/UpdateTask';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/Infrastructure/errors/handleError.types';
import { ErrorType } from 'src/Domain/types/ErrorType';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
      const all_tasks = await this.prisma.task.findMany({
        orderBy: { id: 'asc' },
      });
      return all_tasks;
  }

  async findTaskById(id: number) {
      const get_task_by_id = await this.prisma.task.findUnique({
        where: { id: id },
      });

      if (!get_task_by_id) handleError(ErrorType.ID_NOT_FOUND);

      return get_task_by_id;
  }

  async createTask(body: CreateTaskDTO) {
      const create_task = await this.prisma.task.create({
        data: body,
      });

      return create_task;
  }

  async updateTask(id: number, body: UpdateTaskDTO) {
      const update_task = await this.prisma.task.update({
        where: { id: id },
        data: body,
      });

      return update_task;
  }

  async deleteTask(id: number) {
      await this.prisma.task.delete({ where: { id: id } });

      return;
  }
}
