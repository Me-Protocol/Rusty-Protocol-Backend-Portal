import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `Me Protocol is running: ${new Date().toISOString()}`;
  }
}
