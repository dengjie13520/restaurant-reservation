import { Module } from '@nestjs/common'
import { ReservationResolver } from './reservation.resolver'
import { ReservationService } from './reservation.service'
import { MongoModule } from '../../libs/mongo/mongo.module'

@Module({
    imports: [MongoModule],
    providers: [ReservationResolver,ReservationService],
    exports: [ReservationResolver],
})
export class ReservationModule {}
