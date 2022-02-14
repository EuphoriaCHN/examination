import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';

import { ResponseInterceptor } from '@/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app
    .useGlobalInterceptors(new ResponseInterceptor())
    .listen(process.env.NODE_ENV || 7000);
}

bootstrap();
