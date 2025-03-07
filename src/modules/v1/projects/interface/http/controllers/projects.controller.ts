import { Body, Controller } from '@nestjs/common'
import { CreateProjectDto } from './dtos/create-project.dto'

@Controller()
export class ProjectsController {
	async create(@Body() body: CreateProjectDto) {}

	async findAll() {}

	async findOne() {}
}
