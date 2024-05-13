import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
      .select('_id name description updatedAt createdAt color');
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

  async findAllStatuses(projectId: string) {
    const project = await this.projectModel
      .findById(projectId)
      .populate('statuses')
      .select('statuses')
      .exec();
    return project.statuses;
  }

  async findAllCategories(projectId: string) {
    const project = await this.projectModel
      .findById(projectId)
      .populate('categories')
      .select('categories')
      .exec();
    return project.categories;
  }

  async reorderTasks(projectId: string, tasks: Types.ObjectId[]) {
    await this.projectModel.updateOne(
      { _id: projectId },
      {
        $set: { tasks: tasks },
      },
    );
  }
}
