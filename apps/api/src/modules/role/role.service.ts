import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const roles = await this.prisma.role.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { userRoles: true, rolePermissions: true },
        },
      },
    });
    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      isSystem: role.isSystem,
      usersCount: role._count.userRoles,
      permissionsCount: role._count.rolePermissions,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    }));
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: {
            permission: {
              select: { id: true, name: true, module: true, action: true, description: true },
            },
          },
        },
        _count: { select: { userRoles: true } },
      },
    });
    if (!role) throw new NotFoundException('Role not found');
    return {
      ...role,
      permissions: role.rolePermissions.map((rp) => rp.permission),
      usersCount: role._count.userRoles,
      rolePermissions: undefined,
      _count: undefined,
    };
  }

  async create(dto: CreateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException(`Role "${dto.name}" already exists`);
    }

    return this.prisma.role.create({
      data: {
        name: dto.name,
        description: dto.description,
        rolePermissions: dto.permissionIds?.length
          ? {
              create: dto.permissionIds.map((permissionId) => ({
                permissionId,
              })),
            }
          : undefined,
      },
      include: {
        rolePermissions: {
          include: {
            permission: {
              select: { id: true, name: true, module: true, action: true },
            },
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateRoleDto) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');

    if (role.isSystem && dto.name && dto.name !== role.name) {
      throw new ConflictException('Cannot rename a system role');
    }

    if (dto.name && dto.name !== role.name) {
      const nameTaken = await this.prisma.role.findUnique({
        where: { name: dto.name },
      });
      if (nameTaken) {
        throw new ConflictException(`Role "${dto.name}" already exists`);
      }
    }

    const { permissionIds, ...roleData } = dto;

    if (permissionIds) {
      await this.prisma.rolePermission.deleteMany({
        where: { roleId: id },
      });
    }

    return this.prisma.role.update({
      where: { id },
      data: {
        ...roleData,
        ...(permissionIds && {
          rolePermissions: {
            create: permissionIds.map((permissionId) => ({
              permissionId,
            })),
          },
        }),
      },
      include: {
        rolePermissions: {
          include: {
            permission: {
              select: { id: true, name: true, module: true, action: true },
            },
          },
        },
      },
    });
  }

  async getPermissions() {
    return this.prisma.permission.findMany({
      orderBy: [{ module: 'asc' }, { action: 'asc' }],
    });
  }
}
