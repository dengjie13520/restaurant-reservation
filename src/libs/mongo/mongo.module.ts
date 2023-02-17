import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { Guest,GuestSchema } from './guest.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }])],
  controllers: [],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}