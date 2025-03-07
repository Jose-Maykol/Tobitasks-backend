import { IProject } from 'src/infraestructure/models/project.model'

export interface IProjectRepository {
	create(projectData: Partial<IProject>): Promise<IProject>
}
