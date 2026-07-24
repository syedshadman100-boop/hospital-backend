import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto, CreatePrescriptionDto, MedicalRecordFilterDto } from './dto/medical-record.dto';
export declare class MedicalRecordController {
    private medicalRecordService;
    constructor(medicalRecordService: MedicalRecordService);
    findAll(user: any, filters: MedicalRecordFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateMedicalRecordDto, user: any): Promise<any>;
    addPrescriptions(id: string, dto: CreatePrescriptionDto): Promise<any[]>;
    getPatientTimeline(patientId: string): Promise<{
        patient: any;
        timeline: {
            type: string;
            date: Date;
            data: any;
        }[];
    }>;
}
