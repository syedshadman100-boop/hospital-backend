export declare class CreateLabTestDto {
    name: string;
    category?: string;
    description?: string;
    price: number;
    turnaroundTime?: string;
}
declare const UpdateLabTestDto_base: import("@nestjs/common").Type<Partial<CreateLabTestDto>>;
export declare class UpdateLabTestDto extends UpdateLabTestDto_base {
}
export declare class CreateLabReportDto {
    medicalRecordId: string;
    labTestId: string;
    result?: string;
    fileUrl?: string;
    status?: string;
}
export declare class UpdateLabReportStatusDto {
    status: string;
    result?: string;
    fileUrl?: string;
}
export declare class LabReportFilterDto {
    patientId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}
export {};
