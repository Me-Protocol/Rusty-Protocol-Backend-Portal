import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async sendWebFrontEnd(req: Request, res: Response | any) {
      res.set({
          'Cross-Origin-Resource-Policy': 'cross-site',
          'Cross-Origin-Opener-Policy': 'cross-site',
          'Origin-Agent-Cluster': '?1',
          'Cache-Control': 'public, max-age=0, must-revalidate',
      });

      res.render('index.html');
  }
}
