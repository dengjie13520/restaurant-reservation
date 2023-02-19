import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './libs/auth/auth.guard'
import { AuthService } from './libs/auth/auth.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalGuards(new AuthGuard(new AuthService()))
  await app.listen(3000);
}
bootstrap();
