import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    findAll(): Promise<{
        id: any;
        name: any;
        description: any;
        isSystem: any;
        usersCount: any;
        permissionsCount: any;
        createdAt: any;
        updatedAt: any;
    }[]>;
    getPermissions(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(dto: CreateRoleDto): Promise<any>;
    update(id: string, dto: UpdateRoleDto): Promise<any>;
}
