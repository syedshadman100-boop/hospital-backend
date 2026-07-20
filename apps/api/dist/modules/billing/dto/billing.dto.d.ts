declare class InvoiceItemDto {
    description: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreateInvoiceDto {
    patientId: string;
    appointmentId?: string;
    items: InvoiceItemDto[];
    discount?: number;
    taxRate?: number;
    notes?: string;
}
declare const UpdateInvoiceDto_base: import("@nestjs/common").Type<Partial<CreateInvoiceDto>>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
}
export declare class CreatePaymentDto {
    invoiceId: string;
    amount: number;
    paymentMethod: string;
    transactionId?: string;
}
export declare class RefundPaymentDto {
    amount: number;
    reason: string;
}
export declare class InvoiceFilterDto {
    patientId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}
export {};
