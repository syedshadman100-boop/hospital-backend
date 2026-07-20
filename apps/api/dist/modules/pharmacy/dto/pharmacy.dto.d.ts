export declare class CreateMedicineDto {
    name: string;
    genericName?: string;
    category?: string;
    manufacturer?: string;
    unit?: string;
    price: number;
    stockQuantity?: number;
    minStock?: number;
    expiryDate?: string;
    batchNumber?: string;
}
declare const UpdateMedicineDto_base: import("@nestjs/common").Type<Partial<CreateMedicineDto>>;
export declare class UpdateMedicineDto extends UpdateMedicineDto_base {
}
export declare class MedicineFilterDto {
    category?: string;
    search?: string;
    lowStock?: boolean;
    page?: number;
    limit?: number;
}
export declare class UpdateStockDto {
    quantity: number;
    operation: 'add' | 'deduct';
}
export {};
