import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
export type GuestDocument = Guest  & Document

@Schema()
export class Guest extends Document{
    @Prop()
    id:string;

    @Prop()
    name: string;

    @Prop()
    contact: string;

}


export const GuestSchema = SchemaFactory.createForClass(Guest);