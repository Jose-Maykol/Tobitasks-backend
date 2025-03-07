import { Container } from 'inversify'
import { IProjectRepository } from 'src/application/repositories/project.repository'
import { ProjectService } from 'src/application/services/project.service'
import { ProjectRepository } from 'src/infraestructure/persistence/repositories/project.repository.impl'

const container = new Container()

container.bind<IProjectRepository>('IProjectRepository').to(ProjectRepository)

container.bind<ProjectService>(ProjectService).toSelf()

export { container }
