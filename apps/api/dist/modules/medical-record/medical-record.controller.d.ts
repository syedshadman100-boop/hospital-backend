import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto, CreatePrescriptionDto, MedicalRecordFilterDto } from './dto/medical-record.dto';
export declare class MedicalRecordController {
    private medicalRecordService;
    constructor(medicalRecordService: MedicalRecordService);
    findAll(user: any, filters: MedicalRecordFilterDto): Promise<{
        data: ({
            patient: {
                firstName: string;
                lastName: string;
                phone: string;
                id: string;
            };
            appointment: {
                id: string;
                startTime: string;
                appointmentDate: Date;
            } | null;
            _count: {
                labReports: number;
            };
            prescriptions: {
                id: string;
                createdAt: Date;
                medicalRecordId: string;
                medicineName: string;
                dosage: string;
                frequency: string;
                duration: string;
                instructions: string | null;
                isBeforeFood: boolean;
            }[];
        } & {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            appointmentId: string | null;
            notes: string | null;
            diagnosis: string | null;
            symptoms: string | null;
            vitals: import("@prisma/client/runtime/client").JsonValue | null;
            followUpDate: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        patient: {
            email: string | null;
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
            gender: string | null;
            dateOfBirth: Date | null;
        };
        appointment: {
            id: string;
            startTime: string;
            endTime: string;
            appointmentDate: Date;
            consultationType: string;
        } | null;
        prescriptions: {
            id: string;
            createdAt: Date;
            medicalRecordId: string;
            medicineName: string;
            dosage: string;
            frequency: string;
            duration: string;
            instructions: string | null;
            isBeforeFood: boolean;
        }[];
        labReports: ({
            labTest: {
                id: string;
                name: string;
                category: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            result: string | null;
            status: string;
            medicalRecordId: string;
            labTestId: string;
            fileUrl: string | null;
            completedAt: Date | null;
        })[];
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        notes: string | null;
        diagnosis: string | null;
        symptoms: string | null;
        vitals: import("@prisma/client/runtime/client").JsonValue | null;
        followUpDate: Date | null;
    }>;
    create(dto: CreateMedicalRecordDto, user: any): Promise<{
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
        appointment: {
            id: string;
            startTime: string;
            appointmentDate: Date;
        } | null;
        prescriptions: {
            id: string;
            createdAt: Date;
            medicalRecordId: string;
            medicineName: string;
            dosage: string;
            frequency: string;
            duration: string;
            instructions: string | null;
            isBeforeFood: boolean;
        }[];
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        notes: string | null;
        diagnosis: string | null;
        symptoms: string | null;
        vitals: import("@prisma/client/runtime/client").JsonValue | null;
        followUpDate: Date | null;
    }>;
    addPrescriptions(id: string, dto: CreatePrescriptionDto): Promise<{
        id: string;
        createdAt: Date;
        medicalRecordId: string;
        medicineName: string;
        dosage: string;
        frequency: string;
        duration: string;
        instructions: string | null;
        isBeforeFood: boolean;
    }[]>;
    getPatientTimeline(patientId: string): Promise<{
        patient: {
            email: string | null;
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
        timeline: {
            type: string;
            date: Date;
            data: any;
        }[];
    }>;
}
