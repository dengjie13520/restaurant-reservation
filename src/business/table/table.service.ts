import { Injectable } from '@nestjs/common'
import { MongoService } from '../../libs/mongo/mongo.service'
import { TableInfoArgs,TableObj } from './table.obj'

@Injectable()
export class TableService {


    constructor(
        private mongoService:MongoService
    ) {

    }


    async addTable(info:TableInfoArgs):Promise<string>{
        let userList = await this.mongoService.findTable(info.tableNo)
        while( userList.length >0){
            return 'repeat'
        }
        await this.mongoService.createTable({tableNo:info.tableNo,size:info.size,name:info.name})
        return 'ok'
    }

    async deleteTable(tableNo:string):Promise<string>{
        await this.mongoService.deleteTable(tableNo)
        return 'ok'
    }


    async getTableList():Promise<TableObj[]>{
       return await this.mongoService.findAllTable()
    }
}

