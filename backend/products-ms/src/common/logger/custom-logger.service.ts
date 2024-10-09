import {
  Injectable,
  LoggerService,
  Scope,
  ConsoleLogger,
} from "@nestjs/common";

@Injectable({
  scope: Scope.TRANSIENT,
})
export class CustomLoggerService extends ConsoleLogger
  implements LoggerService {
  log(message: string) {
    super.log(`💡 ${message}`);
  }

  error(message: string, trace: string) {
    super.error(`❌ ${message}`, trace);
  }

  warn(message: string) {
    super.warn(`⚠️ ${message}`);
  }
}
