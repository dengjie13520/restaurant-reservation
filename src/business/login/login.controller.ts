import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service'

@Controller('user')
export class LoginController {
  constructor(private loginService:LoginService) {}

  @Post('/login')
 async loginUser(@Body() body:any): Promise<any> {
    console.log(body)
    return await this.loginService.loginGuest(body)
  }
}
