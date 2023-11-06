import { Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Injectable()
export class AppService {
  async sendWebFrontEnd(req: Request, res: FastifyReply | any) {
    res.headers({
      'Cross-Origin-Resource-Policy': 'cross-site',
      'Cross-Origin-Opener-Policy': 'cross-site',
      'Origin-Agent-Cluster': '?1',
      'Cache-Control':'public, max-age=0, must-revalidate',
    });
    await res.view('index.html');
  }
}
