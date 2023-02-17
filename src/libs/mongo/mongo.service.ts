import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Guest,GuestDocument } from './guest.schema';

@Injectable()
export class MongoService {
  constructor(@InjectModel('Guest') private guestModel:Model<GuestDocument>){}

  async create(playLoad:{id:string,name:string,contact :string}):Promise<Guest>{
    const createdGuest = new this.guestModel(playLoad)
    return createdGuest.save();
  }

  async findAll():Promise<Guest[]>{
    return this.guestModel.find().exec();
  }
}