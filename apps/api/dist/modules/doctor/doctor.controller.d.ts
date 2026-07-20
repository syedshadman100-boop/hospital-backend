import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto, DoctorFilterDto } from './dto/doctor.dto';
export declare class DoctorController {
    private doctorService;
    constructor(doctorService: DoctorService);
    findAll(user: any, filters: DoctorFilterDto): Promise<{
        data: ({
            department: {
                id: string;
                name: string;
            };
            _count: {
                appointments: number;
                schedules: number;
            };
        } & {
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            id: string;
            hospitalId: string;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            departmentId: string;
            gender: string | null;
            dateOfBirth: Date | null;
            qualification: string | null;
            experience: number;
            specialization: string | null;
            bio: string | null;
            consultationFee: import("@prisma/client-runtime-utils").Decimal;
            languages: string | null;
            achievements: string | null;
            memberships: string | null;
            consultationTypes: string | null;
            videoConsultUrl: string | null;
            isAvailable: boolean;
            isOnline: boolean;
            rating: number;
            totalPatients: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        department: {
            description: string | null;
            id: string;
            name: string;
        };
        _count: {
            appointments: number;
            vacations: number;
        };
        schedules: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            dayOfWeek: number;
            doctorId: string;
            startTime: string;
            endTime: string;
            slotDuration: number;
        }[];
    } & {
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        departmentId: string;
        gender: string | null;
        dateOfBirth: Date | null;
        qualification: string | null;
        experience: number;
        specialization: string | null;
        bio: string | null;
        consultationFee: import("@prisma/client-runtime-utils").Decimal;
        languages: string | null;
        achievements: string | null;
        memberships: string | null;
        consultationTypes: string | null;
        videoConsultUrl: string | null;
        isAvailable: boolean;
        isOnline: boolean;
        rating: number;
        totalPatients: number;
    }>;
    create(dto: CreateDoctorDto, user: any): Promise<{
        department: {
            id: string;
            name: string;
        };
    } & {
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        departmentId: string;
        gender: string | null;
        dateOfBirth: Date | null;
        qualification: string | null;
        experience: number;
        specialization: string | null;
        bio: string | null;
        consultationFee: import("@prisma/client-runtime-utils").Decimal;
        languages: string | null;
        achievements: string | null;
        memberships: string | null;
        consultationTypes: string | null;
        videoConsultUrl: string | null;
        isAvailable: boolean;
        isOnline: boolean;
        rating: number;
        totalPatients: number;
    }>;
    update(id: string, dto: UpdateDoctorDto): Promise<{
        department: {
            id: string;
            name: string;
        };
    } & {
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        departmentId: string;
        gender: string | null;
        dateOfBirth: Date | null;
        qualification: string | null;
        experience: number;
        specialization: string | null;
        bio: string | null;
        consultationFee: import("@prisma/client-runtime-utils").Decimal;
        languages: string | null;
        achievements: string | null;
        memberships: string | null;
        consultationTypes: string | null;
        videoConsultUrl: string | null;
        isAvailable: boolean;
        isOnline: boolean;
        rating: number;
        totalPatients: number;
    }>;
    remove(id: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        id: string;
        hospitalId: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        departmentId: string;
        gender: string | null;
        dateOfBirth: Date | null;
        qualification: string | null;
        experience: number;
        specialization: string | null;
        bio: string | null;
        consultationFee: import("@prisma/client-runtime-utils").Decimal;
        languages: string | null;
        achievements: string | null;
        memberships: string | null;
        consultationTypes: string | null;
        videoConsultUrl: string | null;
        isAvailable: boolean;
        isOnline: boolean;
        rating: number;
        totalPatients: number;
    }>;
    getSchedule(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        dayOfWeek: number;
        doctorId: string;
        startTime: string;
        endTime: string;
        slotDuration: number;
    }[]>;
    updateSchedule(id: string, dayOfWeek: string, startTime: string, endTime: string, slotDuration: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        dayOfWeek: number;
        doctorId: string;
        startTime: string;
        endTime: string;
        slotDuration: number;
    }>;
    getAvailableSlots(id: string, date: string): Promise<{
        data: {
            time: string;
            isBooked: boolean;
        }[];
    }>;
}
