import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver,ApolloDriverConfig  } from '@nestjs/apollo'
import { ReservationModule } from './business/reservation/reservation.module'
import { MongooseModule } from '@nestjs/mongoose'

const graphQLOptions = {
  autoSchemaFile: true,
  sortSchema: true,
  useGlobalPrefix: true,
  debug: true,
  playground: true,
  introspection: true,
  driver: ApolloDriver,
}
@Module({
  imports: [ GraphQLModule.forRoot<ApolloDriverConfig>(graphQLOptions),ReservationModule,MongooseModule.forRoot('mongodb://localhost:27017/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply().forRoutes(
        { path: 'graphql', method: RequestMethod.POST },
        { path: 'graphql/noauth', method: RequestMethod.POST } // test for develop environment
    )
}
}
