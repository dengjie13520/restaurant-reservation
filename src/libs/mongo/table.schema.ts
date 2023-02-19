import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
export type TableDocument = Table  & Document

@Schema()
export class Table extends Document{
    @Prop()
    tableNo: string;

    @Prop()
    name: string;

    @Prop()
    size: string;

}


export const TableSchema = SchemaFactory.createForClass(Table);