"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RoleService = class RoleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async findOne(id) {
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
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        return {
            ...role,
            permissions: role.rolePermissions.map((rp) => rp.permission),
            usersCount: role._count.userRoles,
            rolePermissions: undefined,
            _count: undefined,
        };
    }
    async create(dto) {
        const existing = await this.prisma.role.findUnique({
            where: { name: dto.name },
        });
        if (existing) {
            throw new common_1.ConflictException(`Role "${dto.name}" already exists`);
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
    async update(id, dto) {
        const role = await this.prisma.role.findUnique({ where: { id } });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        if (role.isSystem && dto.name && dto.name !== role.name) {
            throw new common_1.ConflictException('Cannot rename a system role');
        }
        if (dto.name && dto.name !== role.name) {
            const nameTaken = await this.prisma.role.findUnique({
                where: { name: dto.name },
            });
            if (nameTaken) {
                throw new common_1.ConflictException(`Role "${dto.name}" already exists`);
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
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleService);
//# sourceMappingURL=role.service.js.map