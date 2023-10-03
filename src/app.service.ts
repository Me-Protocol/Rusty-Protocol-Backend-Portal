import { Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Injectable()
export class AppService {
  async sendWebFrontEnd(req: Request, res: FastifyReply | any) {
    res.headers({
      'Cross-Origin-Resource-Policy': 'cross-site',
      'Cross-Origin-Opener-Policy': 'cross-site',
      'Origin-Agent-Cluster': '?1',
    });
    await res.view('index.html');
  }
}
