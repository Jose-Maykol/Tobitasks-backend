import { InjectModel } from '@nestjs/mongoose'
import { Project } from '../schemas/projects/project.schema'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectRepository {
	constructor(
		@InjectModel(Project.name) private projectModel: Model<Project>
	) {}

	async create(data): Promise<Project> {
		const createdProject = new this.projectModel(data)
		return createdProject.save()
	}
	/* 
	async findAll(): Promise<Project[]> {
		return this.projectModel.find().exec()
	}

	async findById(id: string): Promise<Project | null> {
		return this.projectModel.findById(id).exec()
	}

	async update(
		id: string,
		updateProjectDto: UpdateProjectDto
	): Promise<Project | null> {
		return this.projectModel
			.findByIdAndUpdate(id, updateProjectDto, { new: true })
			.exec()
	}

	async delete(id: string): Promise<Project | null> {
		return this.projectModel.findByIdAndDelete(id).exec()
	} */
}
