import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from '../dtos/create-project.dto'

@Injectable()
export class ProjectsService {
	constructor() {}

	create(data: CreateProjectDto) {
		const { name, description } = data
		return { name, description }
	}
}
