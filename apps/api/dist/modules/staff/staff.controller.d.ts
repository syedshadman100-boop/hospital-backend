import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto, StaffFilterDto } from './dto/staff.dto';
export declare class StaffController {
    private staffService;
    constructor(staffService: StaffService);
    findAll(user: any, filters: StaffFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateStaffDto, user: any): Promise<any>;
    update(id: string, dto: UpdateStaffDto): Promise<any>;
    remove(id: string): Promise<any>;
    markAttendance(id: string, date: string, checkIn?: string, checkOut?: string, status?: string): Promise<any>;
    getAttendance(id: string, startDate: string, endDate: string): Promise<any[]>;
    applyLeave(id: string, body: {
        type: string;
        startDate: string;
        endDate: string;
        reason?: string;
    }): Promise<any>;
    getLeaves(id: string, status?: string): Promise<any[]>;
}
