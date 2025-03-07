import { Module } from '@nestjs/common'
import { ProjectsService } from './application/projects.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectSchema } from './infraestructure/persistence/schemas/projects/project.schema'
import { ProjectsController } from './interface/http/controllers/projects.controller'

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
