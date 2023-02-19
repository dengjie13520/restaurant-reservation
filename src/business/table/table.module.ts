import { Module } from '@nestjs/common'
import { TableResolver } from './table.resolver'
import { TableService } from './table.service'
import { TableController } from './table.controller'
import { MongoModule } from '../../libs/mongo/mongo.module'
import { AuthModule } from '../../libs/auth/auth.module'

@Module({
    imports: [MongoModule,AuthModule],
    controllers:[ TableController ],
    providers: [TableResolver,TableService],
    exports: [TableResolver],
})
export class TableModule {}
