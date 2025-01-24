import { Module } from '@nestjs/common';
import { TasksService } from 'src/Application/Service/tasks.service';
import { TasksController } from 'src/Presentation/Controllers/tasks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
