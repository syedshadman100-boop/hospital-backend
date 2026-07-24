import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto, PatientFilterDto } from './dto/patient.dto';
export declare class PatientService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(hospitalId: string, filters: PatientFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreatePatientDto, hospitalId: string): Promise<any>;
    update(id: string, dto: UpdatePatientDto): Promise<any>;
    remove(id: string): Promise<any>;
    getPatientHistory(patientId: string): Promise<{
        patient: any;
        timeline: {
            type: string;
            date: Date;
            data: any;
        }[];
    }>;
}
