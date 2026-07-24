import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: string): Promise<any>;
    create(dto: CreateRoleDto): Promise<any>;
    update(id: string, dto: UpdateRoleDto): Promise<any>;
    getPermissions(): Promise<any[]>;
}
