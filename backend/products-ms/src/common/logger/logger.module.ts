import { Global, Logger, Module } from "@nestjs/common";
import { CustomLoggerService } from "./custom-logger.service";
@Global()
@Module({
  providers: [
    {
      provide: CustomLoggerService,
      useClass: CustomLoggerService,
    },
    {
      provide: "Logger",
      useExisting: CustomLoggerService,
    },
  ],
  exports: [CustomLoggerService, "Logger"],
})
export class LoggerModule {}
