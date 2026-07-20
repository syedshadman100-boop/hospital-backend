import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        isSystem: boolean;
        usersCount: number;
        permissionsCount: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getPermissions(): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        module: string;
        action: string;
    }[]>;
    findOne(id: string): Promise<{
        permissions: {
            description: string | null;
            id: string;
            name: string;
            module: string;
            action: string;
        }[];
        usersCount: number;
        rolePermissions: undefined;
        _count: undefined;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isSystem: boolean;
    }>;
    create(dto: CreateRoleDto): Promise<{
        rolePermissions: ({
            permission: {
                id: string;
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
    }>;
    update(id: string, dto: UpdateRoleDto): Promise<{
        rolePermissions: ({
            permission: {
                id: string;
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
    }>;
}
