export declare class VitalsDto {
    temperature?: number;
    bp?: string;
    heartRate?: number;
    weight?: number;
    height?: number;
    oxygenSaturation?: number;
}
export declare class CreateMedicalRecordDto {
    appointmentId?: string;
    patientId: string;
    diagnosis: string;
    symptoms?: string;
    notes?: string;
    vitals?: VitalsDto;
    followUpDate?: string;
}
export declare class PrescriptionItemDto {
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
    isBeforeFood?: boolean;
}
export declare class CreatePrescriptionDto {
    medicalRecordId: string;
    prescriptions: PrescriptionItemDto[];
}
export declare class MedicalRecordFilterDto {
    patientId?: string;
    page?: number;
    limit?: number;
}
