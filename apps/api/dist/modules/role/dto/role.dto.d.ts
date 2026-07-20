export declare class CreateRoleDto {
    name: string;
    description?: string;
    permissionIds?: string[];
}
declare const UpdateRoleDto_base: import("@nestjs/common").Type<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
}
export {};
