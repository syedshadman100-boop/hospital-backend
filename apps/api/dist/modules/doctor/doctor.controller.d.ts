import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto, DoctorFilterDto } from './dto/doctor.dto';
export declare class DoctorController {
    private doctorService;
    constructor(doctorService: DoctorService);
    findAll(user: any, filters: DoctorFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateDoctorDto, user: any): Promise<any>;
    update(id: string, dto: UpdateDoctorDto): Promise<any>;
    remove(id: string): Promise<any>;
    getSchedule(id: string): Promise<any[]>;
    updateSchedule(id: string, dayOfWeek: string, startTime: string, endTime: string, slotDuration: string): Promise<any>;
    getAvailableSlots(id: string, date: string): Promise<{
        data: {
            time: string;
            isBooked: boolean;
        }[];
    }>;
}
