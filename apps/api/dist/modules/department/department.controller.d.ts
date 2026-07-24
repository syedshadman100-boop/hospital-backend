import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
export declare class DepartmentController {
    private departmentService;
    constructor(departmentService: DepartmentService);
    findAll(user: any, page?: string, limit?: string, search?: string): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateDepartmentDto, user: any): Promise<any>;
    update(id: string, dto: UpdateDepartmentDto): Promise<any>;
    remove(id: string): Promise<any>;
}
