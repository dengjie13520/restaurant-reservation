import { Injectable } from '@nestjs/common';
var jwt = require('jsonwebtoken');



@Injectable()
export class AuthService {
  constructor(
    ){}

  async getUserToken(playLoad:{account:string,guestId:string,role:string}){
    let token = jwt.sign({account:playLoad.account,guestId:playLoad.guestId,role:playLoad.role},'sh10001000',{ expiresIn: '1h' })
    return token
  }

  async validUserToken(token:string){
    try{
      let decoded = jwt.verify(token, 'sh10001000');
      return decoded
    }catch(e){
      console.log(e)
      return 'error'
    }
  }
  async decodeUserToken(token:string){
    try{
      let decoded = jwt.decode(token,{complete:true});
      console.log('------decoded---')
      console.log(decoded.payload)
      return decoded.payload
    }catch(e){
      console.log(e)
      return 'error'
    }
  }

}