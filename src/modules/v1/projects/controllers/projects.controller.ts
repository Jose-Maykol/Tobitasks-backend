import { Body, Controller, Post } from '@nestjs/common'
import { CreateProjectDto } from '../dtos/create-project.dto'
import { ProjectsService } from '../services/projects.service'

@Controller()
export class ProjectsController {
	constructor(private readonly projectService: ProjectsService) {}

	@Post()
	create(@Body() body: CreateProjectDto) {
		const { name, description } = body

		const project = this.projectService.create({
			name,
			description
		})

		return project
	}

	async findAll() {}

	async findOne() {}
}
