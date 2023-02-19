import { Resolver, Query, Args,Mutation, Context } from '@nestjs/graphql'
import { ReservationService } from './reservation.service'
import { ReserveInfoArgs,ReserveObj,DetailReserveObj } from './reservation.obj'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../../libs/auth/auth.guard'
import { AuthService } from '../../libs/auth/auth.service'

@Resolver()
export class ReservationResolver {
    constructor(private reservationService:ReservationService,private authService:AuthService){}

    @UseGuards(AuthGuard)
    @Mutation((returns) => String, { nullable: true, name: 'reserveTable', description: '客户预定/更新预约信息' })
    async reserveTable(
        @Context() context:any,
        @Args({ name: 'ReserveInfoArgs', nullable: true, description: '预约信息', type: () => ReserveInfoArgs })
        req: ReserveInfoArgs
    ): Promise<string | null> {
        const auth = context.req.headers.authorization
        const user = await this.authService.decodeUserToken(auth)
        return await this.reservationService.reserveTable(req,user)
    }


    @UseGuards(AuthGuard)
    @Query((returns) => [ReserveObj], { nullable: true, name: 'searchReserveList', description: '搜寻预约list' })
    async searchReserveList(
        @Context() context:any,
        @Args({ name: 'date', nullable: true, description: '预约时间', type: () => String })
        date: string,
        @Args({ name: 'status', nullable: true, description: '预约状态', type: () => Number })
        status: number
    ): Promise<ReserveObj[] | null> {
        const auth = context.req.headers.authorization
        const user = await this.authService.decodeUserToken(auth)
        return await this.reservationService.searchReserve(user,date,status)
    }

    @UseGuards(AuthGuard)
    @Query((returns) => DetailReserveObj, { nullable: true, name: 'searchDetailReserve', description: '搜寻预约详细信息' })
    async searchDetailReserve(
        @Context() context:any,
        @Args({ name: 'orderNo', nullable: true, description: '订单号', type: () => String })
        orderNo: string,
    ): Promise<DetailReserveObj | null> {
        const auth = context.req.headers.authorization
        const user = await this.authService.decodeUserToken(auth)
        if(user.role != 'admin'){
            return null
        }
        return await this.reservationService.searchReserveDetail(orderNo)
    }
 
 
}
