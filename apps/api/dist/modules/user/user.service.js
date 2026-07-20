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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { hospitalId, role, search, isActive, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {
            ...(hospitalId && { hospitalId }),
            ...(isActive !== undefined && { isActive }),
            ...(search && {
                OR: [
                    { firstName: { contains: search } },
                    { lastName: { contains: search } },
                    { email: { contains: search } },
                    { phone: { contains: search } },
                ],
            }),
            ...(role && {
                userRoles: {
                    some: {
                        role: { name: role },
                    },
                },
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    avatar: true,
                    isActive: true,
                    isSuperAdmin: true,
                    hospitalId: true,
                    lastLoginAt: true,
                    createdAt: true,
                    updatedAt: true,
                    userRoles: {
                        include: {
                            role: {
                                select: { id: true, name: true },
                            },
                        },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        const mapped = data.map((u) => ({
            ...u,
            roles: u.userRoles.map((ur) => ur.role),
            userRoles: undefined,
        }));
        return {
            data: mapped,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
                isActive: true,
                isSuperAdmin: true,
                hospitalId: true,
                lastLoginAt: true,
                createdAt: true,
                updatedAt: true,
                userRoles: {
                    include: {
                        role: {
                            include: {
                                rolePermissions: {
                                    include: {
                                        permission: {
                                            select: { id: true, name: true, module: true, action: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const roles = user.userRoles.map((ur) => ({
            id: ur.role.id,
            name: ur.role.name,
            description: ur.role.description,
        }));
        const permissions = [
            ...new Set(user.userRoles.flatMap((ur) => ur.role.rolePermissions.map((rp) => rp.permission.name))),
        ];
        return {
            ...user,
            roles,
            permissions,
            userRoles: undefined,
        };
    }
    async create(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('A user with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 12);
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                hospitalId: dto.hospitalId,
                userRoles: dto.roleIds?.length
                    ? {
                        create: dto.roleIds.map((roleId) => ({ roleId })),
                    }
                    : undefined,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                hospitalId: true,
                isActive: true,
                createdAt: true,
                userRoles: {
                    include: {
                        role: { select: { id: true, name: true } },
                    },
                },
            },
        });
    }
    async update(id, dto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (dto.email && dto.email !== user.email) {
            const emailTaken = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (emailTaken) {
                throw new common_1.ConflictException('A user with this email already exists');
            }
        }
        const { roleIds, password, ...userData } = dto;
        const updateData = { ...userData };
        if (password) {
            updateData.password = await bcrypt.hash(password, 12);
        }
        if (roleIds) {
            await this.prisma.userRole.deleteMany({ where: { userId: id } });
            updateData.userRoles = {
                create: roleIds.map((roleId) => ({ roleId })),
            };
        }
        return this.prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                hospitalId: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                userRoles: {
                    include: {
                        role: { select: { id: true, name: true } },
                    },
                },
            },
        });
    }
    async deactivate(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.isSuperAdmin) {
            throw new common_1.BadRequestException('Cannot deactivate a super admin');
        }
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                isActive: true,
            },
        });
    }
    async getUserStats(hospitalId) {
        const where = {
            ...(hospitalId && { hospitalId }),
        };
        const [total, byRole] = await Promise.all([
            this.prisma.user.count({ where }),
            this.prisma.userRole.groupBy({
                by: ['roleId'],
                where: {
                    user: where,
                },
                _count: { id: true },
            }),
        ]);
        const roleDetails = await Promise.all(byRole.map(async (item) => {
            const role = await this.prisma.role.findUnique({
                where: { id: item.roleId },
                select: { name: true },
            });
            return {
                roleId: item.roleId,
                roleName: role?.name ?? 'Unknown',
                count: item._count.id,
            };
        }));
        return {
            total,
            byRole: roleDetails,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map