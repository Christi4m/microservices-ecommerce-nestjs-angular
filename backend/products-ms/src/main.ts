import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SERVER_PORT } from "./common/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const logger = new Logger();
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  await app.listen(port);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
