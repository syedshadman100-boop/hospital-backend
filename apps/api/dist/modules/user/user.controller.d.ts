import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(filters: UserFilterDto): Promise<{
        data: {
            roles: {
                id: string;
                name: string;
            }[];
            userRoles: undefined;
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getStats(user: any): Promise<{
        total: number;
        byRole: {
            roleId: string;
            roleName: string;
            count: number;
        }[];
    }>;
    findOne(id: string): Promise<{
        roles: {
            id: string;
            name: string;
            description: string | null;
        }[];
        permissions: string[];
        userRoles: undefined;
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
    create(dto: CreateUserDto): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string | null;
        isActive: boolean;
        createdAt: Date;
        userRoles: ({
            role: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userRoles: ({
            role: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    }>;
    deactivate(id: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        isActive: boolean;
    }>;
}
