import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
export type ReserveDocument = Reserve  & Document

@Schema()
export class Reserve extends Document{
    @Prop()
    orderNo: string;

    @Prop()
    guestId: string;

    @Prop()
    tableNo: string;

    @Prop()
    startTime: string;

    @Prop()
    status: number;

}


export const ReserveSchema = SchemaFactory.createForClass(Reserve);