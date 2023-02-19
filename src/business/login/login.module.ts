import { Module } from '@nestjs/common'
import { LoginResolver } from './login.resolver'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { MongoModule } from '../../libs/mongo/mongo.module'
import { AuthModule } from '../../libs/auth/auth.module'

@Module({
    imports: [MongoModule,AuthModule],
    controllers:[ LoginController ],
    providers: [LoginResolver,LoginService],
    exports: [LoginResolver],
})
export class LoginModule {}
