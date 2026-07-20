import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
export declare class DepartmentController {
    private departmentService;
    constructor(departmentService: DepartmentService);
    findAll(user: any, page?: string, limit?: string, search?: string): Promise<{
        data: ({
            _count: {
                doctors: number;
            };
        } & {
            description: string | null;
            id: string;
            hospitalId: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string | null;
            image: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        _count: {
            doctors: number;
        };
    } & {
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string | null;
        image: string | null;
    }>;
    create(dto: CreateDepartmentDto, user: any): Promise<{
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string | null;
        image: string | null;
    }>;
    update(id: string, dto: UpdateDepartmentDto): Promise<{
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string | null;
        image: string | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string | null;
        image: string | null;
    }>;
}
