export declare class CreateDoctorDto {
    departmentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    qualification?: string;
    experience?: number;
    specialization?: string;
    bio?: string;
    consultationFee?: number;
    languages?: string;
    achievements?: string;
    memberships?: string;
    consultationTypes?: string;
    videoConsultUrl?: string;
}
declare const UpdateDoctorDto_base: import("@nestjs/common").Type<Partial<CreateDoctorDto>>;
export declare class UpdateDoctorDto extends UpdateDoctorDto_base {
}
export declare class DoctorFilterDto {
    hospitalId?: string;
    departmentId?: string;
    isAvailable?: boolean;
    isOnline?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}
export {};
