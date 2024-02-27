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
    this.server.on('connection', (socket) => {
      console.log(`Conectado ${socket.id}`);
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
