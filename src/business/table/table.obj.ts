import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'

@InputType({ description: '添加桌子信息' })
export class TableInfoArgs {
    @Field((type) => String, { nullable: true, description: '桌子No' })
    tableNo: string

    @Field((type) => String, { nullable: true, description: '桌子别名' })
    name: string;

    @Field((type) => String, { nullable: true, description: '桌子大小:small,medium,large' })
    size: string;
}

@ObjectType({ description: '返回的桌子' })
export class TableObj {
    @Field((type) => String, { nullable: true, description: '桌子No' })
    tableNo: string

    @Field((type) => String, { nullable: true, description: '桌子别名' })
    name: string;

    @Field((type) => String, { nullable: true, description: '桌子大小:small,medium,large' })
    size: string;
}
