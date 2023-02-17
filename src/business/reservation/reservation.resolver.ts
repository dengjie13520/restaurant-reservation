import { Resolver, Query, Args } from '@nestjs/graphql'
import { ReservationService } from './reservation.service'

@Resolver()
export class ReservationResolver {
    constructor(private reservationService:ReservationService){}
    @Query((returns) => Boolean, { nullable: true, name: 'viewport', description: '根据Code查询运营位信息' })
    async getViewportByCode(): Promise<Boolean | null> {
        await this.reservationService.test()
        return true
    }
 
}
