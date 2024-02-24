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
    return await this.projectModel.find();
  }
}
