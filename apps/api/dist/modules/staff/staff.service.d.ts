import { PrismaService } from '../../prisma/prisma.service';
import { CreateStaffDto, UpdateStaffDto, StaffFilterDto } from './dto/staff.dto';
export declare class StaffService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(hospitalId: string, filters: StaffFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateStaffDto, hospitalId: string): Promise<any>;
    update(id: string, dto: UpdateStaffDto): Promise<any>;
    remove(id: string): Promise<any>;
    markAttendance(staffId: string, date: string, checkIn?: string, checkOut?: string, status?: string): Promise<any>;
    getAttendance(staffId: string, startDate: string, endDate: string): Promise<any[]>;
    applyLeave(staffId: string, type: string, startDate: string, endDate: string, reason?: string): Promise<any>;
    getLeaves(staffId: string, status?: string): Promise<any[]>;
    private generateEmployeeId;
}
