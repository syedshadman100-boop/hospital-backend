import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto, PatientFilterDto } from './dto/patient.dto';
export declare class PatientController {
    private patientService;
    constructor(patientService: PatientService);
    findAll(user: any, filters: PatientFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreatePatientDto, user: any): Promise<any>;
    update(id: string, dto: UpdatePatientDto): Promise<any>;
    remove(id: string): Promise<any>;
    getHistory(id: string): Promise<{
        patient: any;
        timeline: {
            type: string;
            date: Date;
            data: any;
        }[];
    }>;
}
