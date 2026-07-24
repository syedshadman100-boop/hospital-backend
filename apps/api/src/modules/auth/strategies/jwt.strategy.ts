import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

export interface JwtPayload {
  sub: string;
  email: string;
  isSuperAdmin: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback-secret',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    const [roleRows] = await this.prisma.pool.query(
      `SELECT r.name as roleName FROM user_roles ur JOIN roles r ON ur.roleId = r.id WHERE ur.userId = ?`,
      [user.id],
    );
    let roles = (roleRows as any[]).map((r) => r.roleName);
    if (roles.length === 0) {
      const [docRows] = await this.prisma.pool.query(
        `SELECT id FROM doctors WHERE userId = ? LIMIT 1`,
        [user.id],
      );
      if ((docRows as any[]).length > 0) {
        roles = ['Doctor'];
      } else {
        roles = ['Hospital Admin'];
      }
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isSuperAdmin: user.isSuperAdmin,
      hospitalId: user.hospitalId,
      roles,
      permissions: [],
    };
  }
}
