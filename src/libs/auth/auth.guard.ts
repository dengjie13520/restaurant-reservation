import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private authService:AuthService
    ){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
      return this.validate(context)
  }

  async validate(context: ExecutionContext): Promise<boolean> {
      const request = GqlExecutionContext.create(context).getContext().req
      console.log(request.headers)
      const auth = request?.headers.authorization as string
      if (!auth) throw new UnauthorizedException()
      const result = await this.authService.validUserToken(auth)
      if (result == 'error'){
        throw new UnauthorizedException()
      }  
      return true
  }
}