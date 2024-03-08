import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TaskService } from './task.service';
import { Server } from 'socket.io';
import { CreateTaskDto } from './dto/create-task.dto';
import { OnModuleInit } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class TaskGateway implements OnModuleInit {
  constructor(
    private readonly taskService: TaskService,
    private projectService: ProjectService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      console.log(`Conectado ${socket.id}`);
      const projectId = socket.handshake.query.projectId;
      if (!projectId) {
        socket.emit('error', {
          message: 'No se ha proporcionado un project id',
        });
      }
      const statuses = await this.projectService.findAllStatuses(
        projectId.toString(),
      );

      if (statuses.length > 0) {
        socket.emit('status', {
          message: 'Estados del proyecto',
          statuses,
        });
      }
      const tasks = await this.projectService.findAllTasks(
        projectId.toString(),
      );
      if (tasks.length > 0) {
        socket.emit('task', {
          message: 'Tareas del proyecto',
          tasks,
        });
      }

      const categories = await this.projectService.findAllCategories(
        projectId.toString(),
      );

      if (categories.length > 0) {
        socket.emit('category', {
          message: 'Categorias del proyecto',
          categories,
        });
      }
    });
  }

  @SubscribeMessage('newTask')
  async onNewTask(
    @MessageBody() data: CreateTaskDto,
    @ConnectedSocket() socket,
  ) {
    const projectId = socket.handshake.query.projectId;
    const { title, description, status, category } = data;
    const newTask = await this.taskService.create(
      projectId,
      title,
      description,
      status,
      category,
    );
    this.server.emit('task', {
      message: 'Tarea creada',
      task: newTask,
    });
  }

  @SubscribeMessage('changeTaskStatus')
  async onChangeTaskStatus(
    @MessageBody() data: { taskId: string; statusId: string },
    @ConnectedSocket() socket,
  ) {
    console.log(data);
    const { taskId, statusId } = data;
    const updatedTask = await this.taskService.updateStatus(taskId, statusId);
    socket.broadcast.emit('updateTask', {
      message: 'Tarea actualizada',
      task: updatedTask,
    });
  }
}
