import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: false })
export class BrandUploadGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const brandId = client.handshake.query.brandId;
    client.join(brandId);
  }

  sendProgress(brandId: string, progress: number) {
    console.log('Sending progress to brand', brandId);
    if (!this.server) {
      console.error('WebSocket server is not initialized.');
      return;
    }
    this.server.to(brandId).emit('progress', progress);
  }

  sendFailure(brandId: string, errorMessage: string) {
    console.log('Sending failure to brand', brandId);
    if (!this.server) {
      console.error('WebSocket server is not initialized.');
      return;
    }
    this.server.to(brandId).emit('failure', errorMessage);
  }
}
