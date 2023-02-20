import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'

@InputType({ description: '预约入参信息' })
export class ReserveInfoArgs {
    @Field((type) => String, { nullable: true, description: '预约订单号,更新时需要传入值' })
    orderNo: string

    @Field((type) => String, { nullable: true, description: '桌子No' })
    tableNo: string

    @Field((type) => String, { nullable: true, description: '预约时间,morning,noon,afternoon,evening,可自定义' })
    startTime: string

    @Field((type) => Number, { nullable: true, description: '预约状态:0关闭/取消,1正常,2完成' })
    status: number

    @Field((type) => String, { nullable: true, description: '预约人' })
    guestId: string
}


@ObjectType({ description: '预约信息' })
export class ReserveObj {
    @Field((type) => String, { nullable: true, description: '预约订单号' })
    orderNo: string

    @Field((type) => String, { nullable: true, description: '桌子No' })
    tableNo: string

    @Field((type) => String, { nullable: true, description: '预约时间,morning,noon,afternoon,evening' })
    startTime: string

    @Field((type) => Number, { nullable: true, description: '预约状态:0关闭/取消,1正常,2完成' })
    status: number

    @Field((type) => String, { nullable: true, description: '预约人' })
    guestId: string
}

@ObjectType({ description: '预约详细信息' })
export class DetailReserveObj {
    @Field((type) => String, { nullable: true, description: '预约订单号' })
    orderNo: string

    @Field((type) => String, { nullable: true, description: '桌子No' })
    tableNo: string

    @Field((type) => String, { nullable: true, description: '桌子别名' })
    tableName: string;

    @Field((type) => String, { nullable: true, description: '桌子大小' })
    tableSize: string;

    @Field((type) => String, { nullable: true, description: '预约时间,morning,noon,afternoon,evening' })
    startTime: string

    @Field((type) => Number, { nullable: true, description: '预约状态:0关闭/取消,1正常,2完成' })
    status: number

    @Field((type) => String, { nullable: true, description: '预约人' })
    guestId: string

    @Field((type) => String, { nullable: true, description: '预约人姓名' })
    name: string;

    @Field((type) => String, { nullable: true, description: '预约人联系方式' })
    contact: string;

}
