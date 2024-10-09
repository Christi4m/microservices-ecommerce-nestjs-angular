import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from "../constants";
import { CustomLoggerService } from "../logger/custom-logger.service";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private configService: ConfigService,

    private readonly logger: CustomLoggerService
  ) {
    super({
      datasources: {
        db: {
          url: configService.get<string>(DATABASE_URL),
        },
      },
    });
    this.logger.setContext(PrismaService.name);
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Database connected");
  }
}
