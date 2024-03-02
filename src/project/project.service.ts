import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(name: string, owner: string, description?: string) {
    const newProject = new this.projectModel({ name, owner, description });
    return await newProject.save();
  }

  async get() {
    return await this.projectModel
      .find()
      .select('_id name description updatedAt createdAt');
  }

  async delete(id: string, owner: string) {
    return await this.projectModel.findOneAndDelete({ _id: id, owner });
  }

  async exists(name: string, owner: string) {
    return await this.projectModel.exists({ name, owner });
  }

  async addTask(projectId: string, taskId: string) {
    return await this.projectModel.updateOne(
      { _id: projectId },
      { $push: { tasks: taskId } },
    );
  }

  async findAllTasks(projectId: string) {
    const project = await this.projectModel
      .findById(projectId)
      .populate('tasks')
      .select('tasks')
      .exec();
    return project.tasks;
  }
}
