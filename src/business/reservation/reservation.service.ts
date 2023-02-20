import { Injectable } from '@nestjs/common'
import { MongoService } from '../../libs/mongo/mongo.service'
import { ReserveInfoArgs,ReserveObj,DetailReserveObj} from './reservation.obj'

@Injectable()
export class ReservationService {


    constructor(
        private mongoService:MongoService
    ) {

    }
    async  test(){
        let result = await this.mongoService.createGust({id:'2',name:'test',contact:'123456'})
        console.log('--2--')
       // console.log(result)
        console.log('--1--')

        let resultTwo  = await this.mongoService.findAllGuest()
      //  console.log(resultTwo)

        let resultThree  = await this.mongoService.findGuest('2')
       // console.log(resultThree)
    }

    async reserveTable(info:ReserveInfoArgs,user:any):Promise<string>{

        let allReserve = await this.mongoService.findAllReserve()
        for(let i=0;i<allReserve.length;i++){

            if(allReserve[i].tableNo == info.tableNo && allReserve[i].startTime == info.startTime && allReserve[i].status == 1){
                if(!info.orderNo){
                    return 'tableHaveOtherOrderNo'
                }else if(allReserve[i].orderNo != info.orderNo){
                    return 'tableHaveOtherOrderNo'
                }
            }
        }

        if(!info.orderNo && user.role == 'guest'){
            if(info.status != 1){
                return 'statusError'  
            }
            let newOrderNo = getRandomString()
            await this.mongoService.createReserve({
                orderNo:newOrderNo,
                guestId:user.guestId,
                tableNo:info.tableNo,
                startTime:info.startTime,
                status:info.status
            })
            return `create:${newOrderNo}`
        }
        const result = await this.mongoService.findReserveByOrderNo(info.orderNo)
        if(result.length == 0){
            return 'noOrder'
        }
        if(result.length>0 && user.role == 'guest' && (info.status == 0 || info.status == 1)){
            await this.mongoService.updateReserve(info)
            return 'update'           
        }else if(result.length>0 && user.role == 'admin'  && (info.status == 0 || info.status == 1 || info.status == 2)){
            await this.mongoService.updateReserve(info)
            return 'update'  
        }else{
            return 'statusError'  
        }
        
    }

    async searchReserve(user:any,date:string,status:number):Promise<ReserveObj[]>{
        if(user.role == 'guest'){
            const result = await this.mongoService.findReserveByGuestId(user.guestId)
            return result
        }
        if(date){
            return await this.mongoService.findReserveByDate(date)
        }
        if(status || status === 0){
            return await this.mongoService.findReserveByStatus(status)
        }
        return await this.mongoService.findAllReserve()
    }

    async searchReserveDetail(orderNo:string):Promise<DetailReserveObj>{
         let reserve = (await this.mongoService.findReserveByOrderNo(orderNo))[0]
         let guest = (await this.mongoService.findGuest(reserve.guestId))[0]
         let table = (await this.mongoService.findTable(reserve.tableNo))[0]
         return{
            orderNo: reserve.orderNo,
            tableNo: reserve.tableNo,
            tableName: table.name,
            tableSize: table.size,
            startTime: reserve.startTime,
            status: reserve.status,
            guestId: reserve.guestId,
            name: guest.name,
            contact: guest.contact
         }

    }
}
function getRandomString(){
    var diffValue = 1000000;
    var myTime = new Date().getTime()
    var myRandom = 1000000 + Math.floor(Math.random()*diffValue)
    var result = 'ORDER_'+myTime+'_'+myRandom;
    return result;
}