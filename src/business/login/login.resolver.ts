import { Resolver, Query, Args,Mutation } from '@nestjs/graphql'
import { LoginService } from './login.service'
import { RegisterInfoArgs,RegisterResultObj,LoginInfoArgs } from './login.obj'

@Resolver()
export class LoginResolver {
    constructor(private loginService:LoginService){}


    @Mutation((returns) => RegisterResultObj, { nullable: true, name: 'registerGuest', description: '客户注册' })
    async registerGuest(
        @Args({ name: 'ReserveInfoArgs', nullable: true, description: '注册信息', type: () => RegisterInfoArgs })
        req: RegisterInfoArgs
    ): Promise<RegisterResultObj> {
        return await this.loginService.registerGuest(req)
    }

    @Mutation((returns) => RegisterResultObj, { nullable: true, name: 'registerAdmin', description: '管理员注册' })
    async registerAdmin(
        @Args({ name: 'ReserveInfoArgs', nullable: true, description: '注册信息', type: () => RegisterInfoArgs })
        req: RegisterInfoArgs
    ): Promise<RegisterResultObj> {
        return await this.loginService.registerAdmin(req)
    }

    @Mutation((returns) => RegisterResultObj, { nullable: true, name: 'login', description: '登录' })
    async login(
        @Args({ name: 'ReserveInfoArgs', nullable: true, description: '注册信息', type: () => LoginInfoArgs })
        req: LoginInfoArgs
    ): Promise<RegisterResultObj> {
        return await this.loginService.loginGuest(req)
    }

 
 
}
