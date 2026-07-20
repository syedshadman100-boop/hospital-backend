export declare class CreateDepartmentDto {
    name: string;
    description?: string;
    icon?: string;
    image?: string;
}
declare const UpdateDepartmentDto_base: import("@nestjs/common").Type<Partial<CreateDepartmentDto>>;
export declare class UpdateDepartmentDto extends UpdateDepartmentDto_base {
}
export {};
