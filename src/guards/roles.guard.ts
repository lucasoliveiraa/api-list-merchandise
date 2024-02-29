import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { UserType } from '../user/enum/user-type.enum'
import { LoginPayload } from '../auth/dto/loginPayload.dto'
import { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    const base64PublicKey = `${process.env.JWT_PUBLIC_KEY}`
    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(token ?? '', {
        algorithms: ['RS256'],
        publicKey: Buffer.from(base64PublicKey, 'base64'),
      })
      .catch(() => undefined)

    if (!loginPayload) {
      return false
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser)
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
