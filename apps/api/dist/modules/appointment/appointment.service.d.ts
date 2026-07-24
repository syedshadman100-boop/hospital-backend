import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentFilterDto, PublicCreateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentService {
    private prisma;
    constructor(prisma: PrismaService);
    publicCreate(dto: PublicCreateAppointmentDto): Promise<{
        success: boolean;
        message: string;
        reference: string;
        appointment: any;
    }>;
    create(dto: CreateAppointmentDto, hospitalId: string): Promise<any>;
    findAll(hospitalId: string, filters: AppointmentFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateAppointmentDto): Promise<any>;
    getTodayAppointments(doctorId: string): Promise<any[]>;
    cancel(id: string, reason: string): Promise<any>;
    private getOrCreateQueue;
    private getNextTokenNumber;
}
