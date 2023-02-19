import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { Guest,GuestSchema } from './guest.schema';
import { Reserve,ReserveSchema } from './reserve.schema';
import { Table,TableSchema } from './table.schema';
import { User,UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema },
    { name: Reserve.name, schema: ReserveSchema },
    { name: Table.name, schema: TableSchema },
    { name: User.name, schema: UserSchema }])],
  controllers: [],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}