export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    hospitalId?: string;
    roleIds?: string[];
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class UserFilterDto {
    hospitalId?: string;
    role?: string;
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
}
export {};
