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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        const hashedPassword = await bcrypt.hash(dto.password, 12);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
            },
        });
        const defaultRole = await this.prisma.role.findUnique({ where: { name: 'Patient' } });
        if (defaultRole) {
            await this.prisma.userRole.create({
                data: { userId: user.id, roleId: defaultRole.id },
            });
        }
        return this.generateTokens(user.id, user.email, user.isSuperAdmin);
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (!user.isActive)
            throw new common_1.UnauthorizedException('Account is deactivated');
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        return this.generateTokens(user.id, user.email, user.isSuperAdmin);
    }
    async refreshToken(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.isActive)
            throw new common_1.UnauthorizedException('User not found');
        return this.generateTokens(user.id, user.email, user.isSuperAdmin);
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
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
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const { password, ...result } = user;
        return {
            ...result,
            roles: user.userRoles.map((ur) => ur.role.name),
            permissions: [
                ...new Set(user.userRoles.flatMap((ur) => ur.role.rolePermissions.map((rp) => rp.permission.name))),
            ],
        };
    }
    async generateTokens(userId, email, isSuperAdmin) {
        const payload = { sub: userId, email, isSuperAdmin };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                userRoles: {
                    include: {
                        role: {
                            include: {
                                rolePermissions: { include: { permission: true } },
                            },
                        },
                    },
                },
            },
        });
        const roles = user?.userRoles.map((ur) => ur.role.name) || [];
        const permissions = [
            ...new Set((user?.userRoles || []).flatMap((ur) => ur.role.rolePermissions.map((rp) => rp.permission.name))),
        ];
        return {
            accessToken,
            refreshToken,
            user: {
                id: userId,
                email,
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                isSuperAdmin,
                roles,
                permissions,
                hospitalId: user?.hospitalId || undefined,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map