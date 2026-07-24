import { PrismaService } from '../../prisma/prisma.service';
import { CreateMedicalRecordDto, CreatePrescriptionDto, MedicalRecordFilterDto } from './dto/medical-record.dto';
export declare class MedicalRecordService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMedicalRecordDto, hospitalId: string): Promise<any>;
    findAll(hospitalId: string, filters: MedicalRecordFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    addPrescriptions(dto: CreatePrescriptionDto): Promise<any[]>;
    getPatientTimeline(patientId: string): Promise<{
        patient: any;
        timeline: {
            type: string;
            date: Date;
            data: any;
        }[];
    }>;
}
