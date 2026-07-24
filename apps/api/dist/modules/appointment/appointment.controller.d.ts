import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentFilterDto, PublicCreateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentController {
    private appointmentService;
    constructor(appointmentService: AppointmentService);
    publicCreate(dto: PublicCreateAppointmentDto): Promise<{
        success: boolean;
        message: string;
        reference: string;
        appointment: any;
    }>;
    findAll(user: any, filters: AppointmentFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateAppointmentDto, user: any): Promise<any>;
    update(id: string, dto: UpdateAppointmentDto): Promise<any>;
    getTodayAppointments(doctorId: string): Promise<any[]>;
    cancel(id: string, body: {
        reason: string;
    }): Promise<any>;
}
