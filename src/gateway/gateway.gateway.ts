import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface card {
  id: string;
  columnId: string;
  title: string;
  description: string;
}

interface column {
  id: string;
  title: string;
  cards: card[];
}

interface Board {
  tasks: column[];
  members: {
    id: string;
    mouse: { x: number; y: number };
  }[];
}

@WebSocketGateway(80, { cors: true })
export class GatewayGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  boards: {
    [key: string]: Board;
  } = {};

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, payload: any) {
    client.emit('message', 'Hello world!');
  }

  @SubscribeMessage('joinBoard')
  handleJoinBoard(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const { boardId, tasks } = payload;
    if (!this.boards[boardId]) {
      this.boards[boardId] = { tasks: [], members: [] };
    }
    this.boards[boardId].tasks = tasks;
    this.boards[boardId].members.push({ id: client.id, mouse: { x: 0, y: 0 } });
    client.join(boardId);
    console.log('Client joined board', client.id, this.boards[boardId]);
  }

  @SubscribeMessage('tasksChange')
  handleTasksChange(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const { boardId, tasks } = payload;
    this.boards[boardId].tasks = tasks;
    client.to(boardId).emit('tasksChange', tasks);
  }

  @SubscribeMessage('mouseMove')
  handleMouseMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const { x, y } = payload;
    const boardId = 'abc';
    const member = this.boards[boardId].members.find(
      (member) => member.id === client.id,
    );
    member.mouse = { x, y };
    client.to(boardId).emit('mouseMove', { id: client.id, x, y });
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected', client.id);
  }

  handleDisconnect(client: Socket): any {
    client.leave('abc');
    if (this.boards['abc']) {
      this.boards['abc'].members = this.boards['abc'].members.filter(
        (member) => member.id !== client.id,
      );
    }
    console.log('Client disconnected', client.id);
  }
}
