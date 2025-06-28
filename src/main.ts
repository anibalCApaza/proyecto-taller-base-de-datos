import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { AppModule } from './app.module';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  nunjucks.configure(join(__dirname, '..', 'views'), {
    autoescape: true,
    express: app,
  });

  app.setViewEngine('html');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
