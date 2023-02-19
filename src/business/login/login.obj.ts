import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'

@InputType({ description: '预约入参信息' })
export class RegisterInfoArgs {
    @Field((type) => String, { nullable: true, description: '用户账号' })
    account: string

    @Field((type) => String, { nullable: true, description: '密码' })
    password: string

    @Field((type) => String, { nullable: true, description: '名字' })
    name: string

    @Field((type) => String, { nullable: true, description: '联系电话' })
    contractInfo: string
}


@ObjectType({ description: '注册结果' })
export class RegisterResultObj {
    @Field((type) => Boolean, { nullable: true, description: '用户账号' })
    success: boolean

    @Field((type) => String, { nullable: true, description: '注册信息' })
    message: string

    @Field((type) => String, { nullable: true, description: 'token' })
    jwt: string
}

@InputType({ description: '预约入参信息' })
export class LoginInfoArgs {
    @Field((type) => String, { nullable: true, description: '用户账号' })
    account: string

    @Field((type) => String, { nullable: true, description: '密码' })
    password: string
}

