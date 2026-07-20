import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("./dto/auth.dto").TokenResponseDto>;
    login(dto: LoginDto): Promise<import("./dto/auth.dto").TokenResponseDto>;
    refresh(dto: RefreshTokenDto): Promise<import("./dto/auth.dto").TokenResponseDto>;
    getProfile(req: any): Promise<{
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
}
