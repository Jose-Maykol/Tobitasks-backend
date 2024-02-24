import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async get() {
    return await this.projectService.get();
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
    const project = await this.projectService.create(name, owner, description);
    return {
      message: 'Proyecto creado',
      projectId: project._id,
    };
  }
}
