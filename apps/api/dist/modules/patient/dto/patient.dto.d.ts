export declare class CreatePatientDto {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    gender?: string;
    dateOfBirth?: string;
    bloodGroup?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    nationality?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactRelation?: string;
    insuranceProvider?: string;
    insurancePolicyNumber?: string;
    allergies?: string;
    medicalHistory?: string;
}
declare const UpdatePatientDto_base: import("@nestjs/common").Type<Partial<CreatePatientDto>>;
export declare class UpdatePatientDto extends UpdatePatientDto_base {
}
export declare class PatientFilterDto {
    search?: string;
    bloodGroup?: string;
    page?: number;
    limit?: number;
}
export {};
