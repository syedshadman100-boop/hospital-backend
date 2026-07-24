import { BillingService } from './billing.service';
import { CreateInvoiceDto, CreatePaymentDto, RefundPaymentDto, InvoiceFilterDto } from './dto/billing.dto';
export declare class BillingController {
    private billingService;
    constructor(billingService: BillingService);
    findAll(user: any, filters: InvoiceFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    createInvoice(dto: CreateInvoiceDto, user: any): Promise<any>;
    createPayment(dto: CreatePaymentDto, user: any): Promise<any>;
    getInvoiceSummary(id: string): Promise<{
        invoice: {
            id: any;
            invoiceNumber: any;
            subtotal: any;
            taxAmount: any;
            discount: any;
            totalAmount: any;
            status: any;
        };
        items: any;
        payments: any;
        totalPaid: any;
        balance: number;
    }>;
    refundPayment(id: string, dto: RefundPaymentDto, user: any): Promise<any>;
}
