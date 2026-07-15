import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../common/decorators/roles.decorator';
import { PERMISSIONS_KEY } from '../../../common/decorators/permissions.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('Not authenticated');

    if (user.isSuperAdmin) return true;

    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
      if (!hasRole) throw new ForbiddenException('Insufficient role');
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.some((perm) =>
        user.permissions?.includes(perm),
      );
      if (!hasPermission) throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
