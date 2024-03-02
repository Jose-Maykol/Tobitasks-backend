import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TaskService } from './task.service';
import { Server } from 'socket.io';
import { CreateTaskDto } from './dto/create-task.dto';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class TaskGateway implements OnModuleInit {
  constructor(private readonly taskService: TaskService) {}

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
      const tasks = await this.taskService.findAllByProjectId(
        projectId.toString(),
      );
      if (tasks.length > 0) {
        this.server.emit('task', {
          message: 'Tareas del proyecto',
          tasks,
        });
      }
    });
  }

  @SubscribeMessage('task')
  async onNewTask(@MessageBody() data: CreateTaskDto) {
    const { projectId, title, description, status, category } = data;
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
}
