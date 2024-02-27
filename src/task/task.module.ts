import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskGateway } from './task.gateway';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ProjectModule,
  ],
  providers: [TaskService, TaskGateway],
})
export class TaskModule {}
