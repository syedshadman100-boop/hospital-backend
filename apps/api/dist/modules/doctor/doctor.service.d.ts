import { PrismaService } from '../../prisma/prisma.service';
import { CreateDoctorDto, UpdateDoctorDto, DoctorFilterDto } from './dto/doctor.dto';
export declare class DoctorService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(hospitalId: string | undefined, filters: DoctorFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateDoctorDto, hospitalId: string): Promise<any>;
    update(id: string, dto: UpdateDoctorDto): Promise<any>;
    remove(id: string): Promise<any>;
    getDoctorSchedule(doctorId: string): Promise<any[]>;
    updateSchedule(doctorId: string, dayOfWeek: number, startTime: string, endTime: string, slotDuration: number): Promise<any>;
    getAvailableSlots(doctorId: string, date: string): Promise<{
        data: {
            time: string;
            isBooked: boolean;
        }[];
    }>;
}
