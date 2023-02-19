import { Module } from '@nestjs/common'
import { ReservationResolver } from './reservation.resolver'
import { ReservationService } from './reservation.service'
import { ReservationController } from './reservation.controller'
import { MongoModule } from '../../libs/mongo/mongo.module'
import { AuthModule } from '../../libs/auth/auth.module'

@Module({
    imports: [MongoModule,AuthModule],
    controllers:[ ReservationController ],
    providers: [ReservationResolver,ReservationService],
    exports: [ReservationResolver],
})
export class ReservationModule {}
