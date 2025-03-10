import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectsController } from './controllers/projects.controller'
import { ProjectSchema } from '../database/schemas/projects/project.schema'
import { ProjectsService } from './services/projects.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Project',
				schema: ProjectSchema
			}
		])
	],
	controllers: [ProjectsController],
	providers: [ProjectsService]
})
export class ProjectsModule {}
