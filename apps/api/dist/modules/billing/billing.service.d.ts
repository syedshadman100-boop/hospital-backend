import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto, CreatePaymentDto, RefundPaymentDto, InvoiceFilterDto } from './dto/billing.dto';
export declare class BillingService {
    private prisma;
    constructor(prisma: PrismaService);
    createInvoice(dto: CreateInvoiceDto, hospitalId: string): Promise<{
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
        invoiceItems: {
            description: string;
            id: string;
            createdAt: Date;
            total: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            invoiceId: string;
        }[];
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        invoiceNumber: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxAmount: import("@prisma/client-runtime-utils").Decimal;
        discount: import("@prisma/client-runtime-utils").Decimal;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        paidAmount: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        paymentMethod: string | null;
        notes: string | null;
    }>;
    findAll(hospitalId: string, filters: InvoiceFilterDto): Promise<{
        data: ({
            patient: {
                firstName: string;
                lastName: string;
                phone: string;
                id: string;
            };
            _count: {
                payments: number;
                invoiceItems: number;
            };
            payments: {
                id: string;
                status: string;
                paymentMethod: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                paymentDate: Date;
            }[];
        } & {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            appointmentId: string | null;
            invoiceNumber: string;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            discount: import("@prisma/client-runtime-utils").Decimal;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            paidAmount: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            paymentMethod: string | null;
            notes: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        patient: {
            email: string | null;
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
        appointment: {
            id: string;
            startTime: string;
            endTime: string;
            appointmentDate: Date;
        } | null;
        payments: {
            id: string;
            createdAt: Date;
            status: string;
            paymentMethod: string;
            invoiceId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            transactionId: string | null;
            refundedAmount: import("@prisma/client-runtime-utils").Decimal | null;
            refundReason: string | null;
            paymentDate: Date;
        }[];
        invoiceItems: {
            description: string;
            id: string;
            createdAt: Date;
            total: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            invoiceId: string;
        }[];
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        invoiceNumber: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxAmount: import("@prisma/client-runtime-utils").Decimal;
        discount: import("@prisma/client-runtime-utils").Decimal;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        paidAmount: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        paymentMethod: string | null;
        notes: string | null;
    }>;
    createPayment(dto: CreatePaymentDto, hospitalId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        paymentMethod: string;
        invoiceId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        transactionId: string | null;
        refundedAmount: import("@prisma/client-runtime-utils").Decimal | null;
        refundReason: string | null;
        paymentDate: Date;
    }>;
    getInvoiceSummary(invoiceId: string): Promise<{
        invoice: {
            id: string;
            invoiceNumber: string;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            taxAmount: import("@prisma/client-runtime-utils").Decimal;
            discount: import("@prisma/client-runtime-utils").Decimal;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            status: string;
        };
        items: {
            description: string;
            id: string;
            createdAt: Date;
            total: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            invoiceId: string;
        }[];
        payments: {
            id: string;
            createdAt: Date;
            status: string;
            paymentMethod: string;
            invoiceId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            transactionId: string | null;
            refundedAmount: import("@prisma/client-runtime-utils").Decimal | null;
            refundReason: string | null;
            paymentDate: Date;
        }[];
        totalPaid: number;
        balance: number;
    }>;
    refundPayment(paymentId: string, dto: RefundPaymentDto, hospitalId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        paymentMethod: string;
        invoiceId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        transactionId: string | null;
        refundedAmount: import("@prisma/client-runtime-utils").Decimal | null;
        refundReason: string | null;
        paymentDate: Date;
    }>;
    private generateInvoiceNumber;
}
