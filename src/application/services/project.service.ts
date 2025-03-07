/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'inversify'
import { IProjectRepository } from '../repositories/project.repository'

@injectable()
export class ProjectService {
	constructor(
		@inject('IProjectRepository') private projectRepository: IProjectRepository
	) {}

	async create(data: any) {
		const newProject = await this.projectRepository.create(data)
		return newProject
	}
}
