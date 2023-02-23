import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config } from 'dotenv'

async function bootstrap() {
  config()
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('.html',require('ejs').__express)
  app.setViewEngine('html');

  function exit(ret = 0) {
    return app.close().finally(() => {
        console.log('BYE, BYE!')
        process.exit(ret)
    })
  }
    process.on('SIGTERM', () => {
      console.log('This application is being terminated')
      exit(1)
  })

  process.on('uncaughtException', (error) => {
      console.log('There is a unhandled critical error.')
      console.log(error)
      console.log('error message :' + error.message)
      exit(1)
  })

  process.on('unhandledRejection', (error) => {
    console.log('There is a unhandled critical rejection.')
    console.log(error)
    exit(1)
  })
  await app.listen(3000);
}
bootstrap();
