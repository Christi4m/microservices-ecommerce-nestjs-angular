import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "@hapi/joi";
import { PrismaService } from "./common/db/prisma.service";
import { LoggerModule } from "./common/logger/logger.module";
@Module({
  imports: [
    ProductsModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production")
          .default("development"),
      }),
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
