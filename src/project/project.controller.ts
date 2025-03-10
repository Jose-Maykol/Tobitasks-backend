import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get() {
    const projects = await this.projectService.get();
    if (projects.length === 0) {
      throw new HttpException('No hay proyectos', 404);
    }
    return { projects };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: any,
  ) {
    const { id } = req.user;
    const owner = id.toString();
    const { name, description } = createProjectDto;
    const exists = await this.projectService.exists(name, owner);
    if (exists) {
      throw new HttpException('El proyecto ya existe', 409);
    }
    const project = await this.projectService.create(name, owner, description);
    return {
      message: 'Proyecto creado',
      projectId: project._id,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Request() req: any) {
    const { id } = req.user;
    const owner = id.toString();
    const { id: projectId } = req.params;
    const project = await this.projectService.delete(projectId, owner);
    if (!project) {
      return { message: 'Proyecto no encontrado' };
    }
    return { message: 'Proyecto eliminado' };
  }
}
