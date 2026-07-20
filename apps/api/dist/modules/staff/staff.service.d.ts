import { PrismaService } from '../../prisma/prisma.service';
import { CreateStaffDto, UpdateStaffDto, StaffFilterDto } from './dto/staff.dto';
export declare class StaffService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(hospitalId: string, filters: StaffFilterDto): Promise<{
        data: ({
            _count: {
                attendance: number;
                leaves: number;
            };
        } & {
            department: string | null;
            shift: string | null;
            email: string | null;
            firstName: string;
            lastName: string;
            phone: string | null;
            id: string;
            hospitalId: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            gender: string | null;
            dateOfBirth: Date | null;
            designation: string | null;
            joinDate: Date | null;
            salary: import("@prisma/client-runtime-utils").Decimal | null;
            employeeId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        attendance: {
            id: string;
            createdAt: Date;
            date: Date;
            status: string;
            notes: string | null;
            staffId: string;
            checkIn: Date | null;
            checkOut: Date | null;
        }[];
        leaves: {
            type: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            reason: string | null;
            staffId: string;
            startDate: Date;
            endDate: Date;
            approvedBy: string | null;
        }[];
    } & {
        department: string | null;
        shift: string | null;
        email: string | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        gender: string | null;
        dateOfBirth: Date | null;
        designation: string | null;
        joinDate: Date | null;
        salary: import("@prisma/client-runtime-utils").Decimal | null;
        employeeId: string;
    }>;
    create(dto: CreateStaffDto, hospitalId: string): Promise<{
        department: string | null;
        shift: string | null;
        email: string | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        gender: string | null;
        dateOfBirth: Date | null;
        designation: string | null;
        joinDate: Date | null;
        salary: import("@prisma/client-runtime-utils").Decimal | null;
        employeeId: string;
    }>;
    update(id: string, dto: UpdateStaffDto): Promise<{
        department: string | null;
        shift: string | null;
        email: string | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        gender: string | null;
        dateOfBirth: Date | null;
        designation: string | null;
        joinDate: Date | null;
        salary: import("@prisma/client-runtime-utils").Decimal | null;
        employeeId: string;
    }>;
    remove(id: string): Promise<{
        department: string | null;
        shift: string | null;
        email: string | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        gender: string | null;
        dateOfBirth: Date | null;
        designation: string | null;
        joinDate: Date | null;
        salary: import("@prisma/client-runtime-utils").Decimal | null;
        employeeId: string;
    }>;
    markAttendance(staffId: string, date: string, checkIn?: string, checkOut?: string, status?: string): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        status: string;
        notes: string | null;
        staffId: string;
        checkIn: Date | null;
        checkOut: Date | null;
    }>;
    getAttendance(staffId: string, startDate: string, endDate: string): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        status: string;
        notes: string | null;
        staffId: string;
        checkIn: Date | null;
        checkOut: Date | null;
    }[]>;
    applyLeave(staffId: string, type: string, startDate: string, endDate: string, reason?: string): Promise<{
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string | null;
        staffId: string;
        startDate: Date;
        endDate: Date;
        approvedBy: string | null;
    }>;
    getLeaves(staffId: string, status?: string): Promise<{
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string | null;
        staffId: string;
        startDate: Date;
        endDate: Date;
        approvedBy: string | null;
    }[]>;
    private generateEmployeeId;
}
