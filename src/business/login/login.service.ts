import { Injectable } from '@nestjs/common'
import { MongoService } from '../../libs/mongo/mongo.service'
import { RegisterInfoArgs,RegisterResultObj,LoginInfoArgs } from './login.obj'
import { AuthService } from '../../libs/auth/auth.service'


@Injectable()
export class LoginService {


    constructor(
        private mongoService:MongoService,
        private authService:AuthService,
    ) {

    }


    async registerGuest(info:RegisterInfoArgs):Promise<RegisterResultObj>{
        const role = 'guest'
        const id = getRandomString()
        const userList = await this.mongoService.findAccount(info.account)
        console.log('------------userList----------------------------------')
        console.log(userList)
        if( userList.length >0){
            return {
                success:false,
                message:'AccountRepeat',
                jwt:''
            }
        }

        await this.mongoService.createGust({id:id,name:info.name,contact:info.contractInfo})
        await this.mongoService.createAccount({account:info.account,password:info.password,role:role,guestId:id})
        const token = await this.authService.getUserToken({account:info.account,guestId:id,role:role})
        console.log('----------------------------------------------')
        console.log(token)
        return {
            success:true,
            message:role,
            jwt:token
        }
    }

    async registerAdmin(info:RegisterInfoArgs):Promise<RegisterResultObj>{
        const role = 'admin'
        const userList = await this.mongoService.findAccount(info.account)
        console.log('------------userList----------------------------------')
        console.log(userList)
        if( userList.length >0){
            return {
                success:false,
                message:'AccountRepeat',
                jwt:''
            }
        }

        await this.mongoService.createAccount({account:info.account,password:info.password,role:role,guestId:'-'})
        const token = await this.authService.getUserToken({account:info.account,guestId:'-',role:role})
        console.log('----------------------------------------------')
        console.log(token)
        return {
            success:true,
            message:role,
            jwt:token
        }
    }

    async loginGuest(info:LoginInfoArgs):Promise<RegisterResultObj>{
        const userList = await this.mongoService.findAccount(info.account)
        console.log('------------userList----------------------------------')
        console.log(userList)
        if( userList.length == 0 ){
            return {
                success:false,
                message:'NoAccount',
                jwt:''
            }
        }
        if(userList[0].password == info.password){
            const token = await this.authService.getUserToken({account:info.account,guestId:userList[0].guestId,role:userList[0].role})
            return {
                success:true,
                message:userList[0].role,
                jwt:token
            }
        }else{
            return {
                success:false,
                message:'wrong',
                jwt:''
            }
        }


    }
}
function getRandomString(){
    var diffValue = 1000000;
    var myTimestamp  = new Date().getTime();
    var myRandom = 1000000 + Math.floor(Math.random()*diffValue)
    var result = 'GUEST'+myTimestamp+'_'+myRandom;
    return result;
}
  