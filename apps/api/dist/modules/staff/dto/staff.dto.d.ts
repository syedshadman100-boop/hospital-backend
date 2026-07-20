export declare class CreateStaffDto {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    department?: string;
    designation?: string;
    joinDate?: string;
    salary?: number;
    shift?: string;
}
declare const UpdateStaffDto_base: import("@nestjs/common").Type<Partial<CreateStaffDto>>;
export declare class UpdateStaffDto extends UpdateStaffDto_base {
}
export declare class StaffFilterDto {
    department?: string;
    shift?: string;
    isActive?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}
export {};
