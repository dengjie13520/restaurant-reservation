import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
export type UserDocument =  User & Document

@Schema()
export class User extends Document{
    @Prop()
    id:string;

    @Prop()
    account: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop()
    guestId: string;

}


export const UserSchema = SchemaFactory.createForClass(User);