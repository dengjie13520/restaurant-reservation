import { Resolver, Query, Args,Mutation, Context } from '@nestjs/graphql'
import { TableService } from './table.service'
import { TableInfoArgs,TableObj } from './table.obj'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../../libs/auth/auth.guard'
import { AuthService } from '../../libs/auth/auth.service'

@Resolver()
export class TableResolver {
    constructor(private tableService:TableService,private authService:AuthService){}

    @UseGuards(AuthGuard)
    @Mutation((returns) => String, { nullable: true, name: 'addTable', description: '添加桌子' })
    async addTable(
        @Context() context:any,
        @Args({ name: 'tableInfo', nullable: true, description: '桌子信息', type: () => TableInfoArgs })
        req: TableInfoArgs
    ): Promise<string> {
        const auth = context.req.headers.authorization
        const user = await this.authService.decodeUserToken(auth)
        console.log(user.role)
        if(user.role != 'admin'){
            return 'notAdmin'
        }
        return await this.tableService.addTable(req)
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => String, { nullable: true, name: 'deleteTable', description: 'delete table' })
    async deleteTable(
        @Context() context:any,
        @Args({ name: 'tableNo', nullable: true, description: '桌子No', type: () => String })
        tableNo: string
    ): Promise<string> {
        const auth = context.req.headers.authorization
        const user = await this.authService.decodeUserToken(auth)
        console.log(user.role)
        if(user.role != 'admin'){
            return 'notAdmin'
        }
        return await this.tableService.deleteTable(tableNo)
    }

    @UseGuards(AuthGuard)
    @Query((returns) => [TableObj], { nullable: true, name: 'getTableList', description: '获取桌子' })
    async getTableList(
    ): Promise<TableObj[]> {
        return await this.tableService.getTableList()
    }

 
 
}
