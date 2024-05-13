import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';
import { Task, TaskDocument } from 'src/schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private projectService: ProjectService,
  ) {}

  async create(projectId: string, title: string, status: string) {
    const newTask = new this.taskModel({
      title,
      status,
    });
    const savedTask = await newTask.save();
    const taskId = savedTask._id.toString();
    await this.projectService.addTask(projectId, taskId);
    return savedTask;
  }

  async updateStatus(taskId: string, status: string) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    );
    console.log(updatedTask);
    return updatedTask;
  }
}
