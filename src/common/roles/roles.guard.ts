// roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from './roles.decorator';
  import { Role } from './roles.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // Retrieve the roles specified on the handler (controller method)
      const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // If no roles are specified, default to allowing only Admins
      const requiredRoles = roles && roles.length > 0 ? roles : [Role.Admin];
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user) {
        throw new ForbiddenException('User not authenticated');
      }
  
      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }
  
      return true;
    }
  }
  