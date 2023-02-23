import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Guest,GuestDocument } from './guest.schema';
import { User,UserDocument } from './user.schema';
import { Table,TableDocument } from './table.schema';
import { Reserve,ReserveDocument } from './reserve.schema';

@Injectable()
export class MongoService {
  constructor(
    @InjectModel('Guest') private guestModel:Model<GuestDocument>,
    @InjectModel('User') private accountModel:Model<UserDocument>,
    @InjectModel('Table') private tableModel:Model<TableDocument>,
    @InjectModel('Reserve') private reserveModel:Model<ReserveDocument>,
    ){}

  async createGust(playLoad:{id:string,name:string,contact :string}):Promise<Guest>{
    const createdGuest = new this.guestModel(playLoad)
    return createdGuest.save();
  }

  async findAllGuest():Promise<Guest[]>{
    return this.guestModel.find().exec();
  }

  async findGuest(id:string):Promise<Guest[]>{
    return this.guestModel.find({'id':id}).exec();
  }

  async findAccount(account:string):Promise<User[]>{
    return this.accountModel.find({'account':account}).exec();
  }

  async createAccount(playLoad:{account:string,password :string,role:string,guestId:string}):Promise<User>{
    const createdAccount = new this.accountModel(playLoad)
    return createdAccount.save();
  }

  async createTable(playLoad:{name:string,tableNo :string, size:string}):Promise<Table>{
    const createdTable = new this.tableModel(playLoad)
    return createdTable.save();
  }

  async findAllTable():Promise<Table[]>{
    return this.tableModel.find().exec();
  }

  async findTable(tableNo:string):Promise<Table[]>{
    return this.tableModel.find({'tableNo':tableNo}).exec();
  }

  async deleteTable(tableNo:string){
    this.tableModel.deleteOne({'tableNo':tableNo},(err,doc)=>{
      if(err){
        console.log(err)
        return
      }
      console.log("doc:",doc)
    });
  }

  async createReserve(
    playLoad:{orderNo:string,guestId :string, tableNo:string,startTime:string,status:number}
    ):Promise<Reserve>{
    const createdReserve = new this.reserveModel(playLoad)
    return createdReserve.save();
  }

  async updateReserve(
    playLoad:{orderNo:string,guestId :string, tableNo:string,startTime:string,status:number}
    ):Promise<boolean>{
    await this.reserveModel.updateOne({orderNo:playLoad.orderNo},playLoad)
    return true
  }

  async findAllReserve():Promise<Reserve[]>{
    return this.reserveModel.find().exec();
  }

  async findReserveByOrderNo(orderNo:string):Promise<Reserve[]>{
    return this.reserveModel.find({'orderNo':orderNo}).exec();
  }

  
  async findReserveByGuestId(guestId:string):Promise<Reserve[]>{
    return this.reserveModel.find({'guestId':guestId}).exec();
  }

  async findReserveByDate(startTime:string):Promise<Reserve[]>{
    return this.reserveModel.find({'startTime':{$regex:startTime}}).exec();
  }

  async findReserveByDateAndStatus(startTime:string,status:number):Promise<Reserve[]>{
    return this.reserveModel.find({'status':status,'startTime':{$regex:startTime}}).exec();
  }


  async findReserveByStatus(status:number):Promise<Reserve[]>{
    return this.reserveModel.find({'status':status}).exec();
  }
}