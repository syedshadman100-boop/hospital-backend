import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto, TokenResponseDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<TokenResponseDto>;
    login(dto: LoginDto): Promise<TokenResponseDto>;
    refreshToken(userId: string): Promise<TokenResponseDto>;
    getProfile(userId: string): Promise<{
        roles: string[];
        permissions: string[];
        userRoles: ({
            role: {
                rolePermissions: ({
                    permission: {
                        description: string | null;
                        id: string;
                        createdAt: Date;
                        name: string;
                        module: string;
                        action: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    roleId: string;
                    permissionId: string;
                })[];
            } & {
                description: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                isSystem: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string | null;
        avatar: string | null;
        isActive: boolean;
        isSuperAdmin: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private generateTokens;
}
