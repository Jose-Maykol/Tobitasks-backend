import { injectable } from 'inversify'
import { Model } from 'mongoose'
import { IProjectRepository } from 'src/application/repositories/project.repository'
import { IProject, Project } from 'src/infraestructure/models/project.model'

@injectable()
export class ProjectRepository implements IProjectRepository {
	private projectModel: Model<IProject>

	constructor(projectModel: Model<IProject> = Project) {
		this.projectModel = projectModel
	}

	async create(projectData: Partial<IProject>): Promise<IProject> {
		try {
			const project = new this.projectModel(projectData)
			return await project.save()
		} catch (error) {
			throw new Error(`Error creating project: ${error.message}`)
		}
	}
}
