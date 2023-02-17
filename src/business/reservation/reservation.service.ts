import { Injectable } from '@nestjs/common'
import { MongoService } from '../../libs/mongo/mongo.service'

@Injectable()
export class ReservationService {


    constructor(
        private mongoService:MongoService
    ) {

    }
    async  test(){
        let result = await this.mongoService.create({id:'1',name:'test',contact:'123456'})
        console.log('--2--')
        console.log(result)
        console.log('--1--')

        let resultTwo  = await this.mongoService.findAll()
        console.log(resultTwo)
    }
}
