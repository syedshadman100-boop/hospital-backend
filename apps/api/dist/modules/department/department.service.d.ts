import { PrismaService } from '../../prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
export declare class DepartmentService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(hospitalId?: string, page?: number, limit?: number, search?: string): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateDepartmentDto, hospitalId: string): Promise<any>;
    update(id: string, dto: UpdateDepartmentDto): Promise<any>;
    remove(id: string): Promise<any>;
}
