import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto, CreatePaymentDto, RefundPaymentDto, InvoiceFilterDto } from './dto/billing.dto';
export declare class BillingService {
    private prisma;
    constructor(prisma: PrismaService);
    createInvoice(dto: CreateInvoiceDto, hospitalId: string): Promise<any>;
    findAll(hospitalId: string, filters: InvoiceFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    createPayment(dto: CreatePaymentDto, hospitalId: string): Promise<any>;
    getInvoiceSummary(invoiceId: string): Promise<{
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
    refundPayment(paymentId: string, dto: RefundPaymentDto, hospitalId: string): Promise<any>;
    private generateInvoiceNumber;
}
