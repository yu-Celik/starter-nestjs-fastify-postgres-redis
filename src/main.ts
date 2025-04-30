import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import fastifyHelmet from '@fastify/helmet';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const config = new DocumentBuilder()
    .setTitle("NestJS API")
    .setDescription("API for NestJS")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.register(fastifyHelmet);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port') || 3000;
  const host = configService.get<string>('server.host') || '0.0.0.0';

  await app.listen(port, host);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
