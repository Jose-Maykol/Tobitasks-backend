import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from '../dtos/create-project.dto'
import { ProjectRepository } from '../../database/repositories/project.repository.impl'

@Injectable()
export class ProjectsService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	create(data: CreateProjectDto) {
		const { name, description } = data
		return this.projectRepository.create({ name, description })
	}
}
