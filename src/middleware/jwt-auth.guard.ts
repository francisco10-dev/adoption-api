import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    if(!user){
        throw new UnauthorizedException('Acceso no autorizado. Token inválido o no proporcionado.');
    }
    return user;
  }
}
