import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver,ApolloDriverConfig  } from '@nestjs/apollo'
import { ReservationModule } from './business/reservation/reservation.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './libs/auth/auth.module'
import { LoginModule } from './business/login/login.module'
import { TableModule } from './business/table/table.module'

const graphQLOptions = {
  autoSchemaFile: true,
  sortSchema: true,
  useGlobalPrefix: true,
  debug: true,
  playground: true,
  introspection: true,
  driver: ApolloDriver,
}
const mongoUrl = process.env["MONGO_URL"] || 'mongodb://localhost:27017/test'
console.log('------start------'+mongoUrl)
@Module({
  imports: [ 
    GraphQLModule.forRoot<ApolloDriverConfig>(graphQLOptions),
    ReservationModule,
    MongooseModule.forRoot(mongoUrl),
    AuthModule,
    LoginModule,
    TableModule,],
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
