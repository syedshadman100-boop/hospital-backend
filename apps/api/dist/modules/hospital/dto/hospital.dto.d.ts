export declare class CreateHospitalDto {
    name: string;
    slug: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
}
declare const UpdateHospitalDto_base: import("@nestjs/common").Type<Partial<CreateHospitalDto>>;
export declare class UpdateHospitalDto extends UpdateHospitalDto_base {
}
export {};
