import { AppUtils } from '@common/helpers/app.utils';
import { IConfig } from '@lib/config/config.interface';
import { Logger } from '@nestjs/common';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import bodyParser from 'body-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<IConfig, true>);

  const logger = new Logger('Bootstrap');

  // ======================================================
  // security
  // ======================================================

  app.use(compression());
  app.enable('trust proxy');
  app.set('etag', 'strong');
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(helmet());
  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    maxAge: 3600,
    origin: configService.get('app.allowedHosts', { infer: true }),
  });

  // =====================================================
  // configureNe

  // =====================================================
  // configureNestGlobals
  // =====================================================

  const globalPrefix = configService.get('app.prefix', { infer: true });

  app.setGlobalPrefix(globalPrefix);

  // =========================================================
  // configureNestSwagger
  // =========================================================

  AppUtils.setupSwagger(app, configService);

  const port =
    process.env.PORT || configService.get('app.port', { infer: true });

  await app.listen(port);

  logger.debug(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );

  logger.debug(`📑 Swagger is running on: http://localhost:${port}/doc`);
}
(async () => await bootstrap())();
