import { Injectable } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { loggerFormat, loggerTransport } from "./logger.module";

@Injectable()
export class LoggerService {
  // extendable redis cache service goes here
}

export const logger = WinstonModule.createLogger({
  format: loggerFormat,
  transports: [loggerTransport],
});
