"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BillingService = class BillingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createInvoice(dto, hospitalId) {
        const patient = await this.prisma.patient.findFirst({
            where: { id: dto.patientId, hospitalId, isActive: true },
        });
        if (!patient) {
            throw new common_1.BadRequestException('Patient not found in this hospital');
        }
        if (dto.appointmentId) {
            const appointment = await this.prisma.appointment.findFirst({
                where: { id: dto.appointmentId, hospitalId },
            });
            if (!appointment) {
                throw new common_1.BadRequestException('Appointment not found in this hospital');
            }
            const existingInvoice = await this.prisma.invoice.findFirst({
                where: { appointmentId: dto.appointmentId },
            });
            if (existingInvoice) {
                throw new common_1.BadRequestException('An invoice already exists for this appointment');
            }
        }
        const invoiceNumber = await this.generateInvoiceNumber(hospitalId);
        const subtotal = dto.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const discount = dto.discount || 0;
        const taxAmount = dto.taxRate ? ((subtotal - discount) * dto.taxRate) / 100 : 0;
        const totalAmount = subtotal - discount + taxAmount;
        const invoice = await this.prisma.invoice.create({
            data: {
                hospitalId,
                patientId: dto.patientId,
                appointmentId: dto.appointmentId || null,
                invoiceNumber,
                subtotal,
                discount,
                taxAmount,
                totalAmount,
                notes: dto.notes,
                invoiceItems: {
                    create: dto.items.map((item) => ({
                        description: item.description,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        total: item.quantity * item.unitPrice,
                    })),
                },
            },
            include: {
                invoiceItems: true,
                patient: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
            },
        });
        return invoice;
    }
    async findAll(hospitalId, filters) {
        const { patientId, status, dateFrom, dateTo, page = 1, limit = 10, } = filters;
        const skip = (page - 1) * limit;
        const where = {
            hospitalId,
            ...(patientId && { patientId }),
            ...(status && { status }),
            ...(dateFrom || dateTo
                ? {
                    createdAt: {
                        ...(dateFrom && { gte: new Date(dateFrom) }),
                        ...(dateTo && { lte: new Date(dateTo + 'T23:59:59.999Z') }),
                    },
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.invoice.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    patient: {
                        select: { id: true, firstName: true, lastName: true, phone: true },
                    },
                    payments: {
                        select: { id: true, amount: true, paymentMethod: true, status: true, paymentDate: true },
                    },
                    _count: { select: { invoiceItems: true, payments: true } },
                },
            }),
            this.prisma.invoice.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: {
                patient: {
                    select: { id: true, firstName: true, lastName: true, phone: true, email: true },
                },
                appointment: {
                    select: { id: true, appointmentDate: true, startTime: true, endTime: true },
                },
                invoiceItems: true,
                payments: {
                    orderBy: { paymentDate: 'desc' },
                },
            },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
    async createPayment(dto, hospitalId) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id: dto.invoiceId },
            include: { payments: { where: { status: 'success' } } },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (invoice.hospitalId !== hospitalId) {
            throw new common_1.BadRequestException('Invoice does not belong to this hospital');
        }
        if (invoice.status === 'cancelled' || invoice.status === 'refunded') {
            throw new common_1.BadRequestException(`Cannot add payment to an invoice with status '${invoice.status}'`);
        }
        const totalPaid = invoice.paidAmount.toNumber();
        const remaining = invoice.totalAmount.toNumber() - totalPaid;
        if (dto.amount > remaining) {
            throw new common_1.BadRequestException(`Payment amount (₹${dto.amount}) exceeds remaining balance (₹${remaining})`);
        }
        const payment = await this.prisma.payment.create({
            data: {
                invoiceId: dto.invoiceId,
                amount: dto.amount,
                paymentMethod: dto.paymentMethod,
                transactionId: dto.transactionId,
                status: 'success',
            },
        });
        const newPaidAmount = totalPaid + dto.amount;
        const newStatus = newPaidAmount >= invoice.totalAmount.toNumber() ? 'paid' : 'partial';
        await this.prisma.invoice.update({
            where: { id: dto.invoiceId },
            data: {
                paidAmount: newPaidAmount,
                status: newStatus,
                paymentMethod: dto.paymentMethod,
            },
        });
        return payment;
    }
    async getInvoiceSummary(invoiceId) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id: invoiceId },
            include: {
                invoiceItems: true,
                payments: {
                    where: { status: 'success' },
                    orderBy: { paymentDate: 'desc' },
                },
            },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount.toNumber(), 0);
        const balance = invoice.totalAmount.toNumber() - totalPaid;
        return {
            invoice: {
                id: invoice.id,
                invoiceNumber: invoice.invoiceNumber,
                subtotal: invoice.subtotal,
                taxAmount: invoice.taxAmount,
                discount: invoice.discount,
                totalAmount: invoice.totalAmount,
                status: invoice.status,
            },
            items: invoice.invoiceItems,
            payments: invoice.payments,
            totalPaid,
            balance,
        };
    }
    async refundPayment(paymentId, dto, hospitalId) {
        const payment = await this.prisma.payment.findUnique({
            where: { id: paymentId },
            include: { invoice: true },
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        if (payment.invoice.hospitalId !== hospitalId) {
            throw new common_1.BadRequestException('Payment does not belong to this hospital');
        }
        if (payment.status === 'refunded') {
            throw new common_1.BadRequestException('Payment has already been refunded');
        }
        if (dto.amount > payment.amount.toNumber()) {
            throw new common_1.BadRequestException('Refund amount cannot exceed payment amount');
        }
        const refundedSoFar = payment.refundedAmount?.toNumber() || 0;
        if (dto.amount > payment.amount.toNumber() - refundedSoFar) {
            throw new common_1.BadRequestException(`Refund amount exceeds available refund (₹${payment.amount.toNumber() - refundedSoFar})`);
        }
        const updatedPayment = await this.prisma.payment.update({
            where: { id: paymentId },
            data: {
                refundedAmount: refundedSoFar + dto.amount,
                refundReason: dto.reason,
                status: dto.amount === payment.amount.toNumber() ? 'refunded' : payment.status,
            },
        });
        const invoicePaid = payment.invoice.paidAmount.toNumber();
        const newPaidAmount = invoicePaid - dto.amount;
        const invoiceTotal = payment.invoice.totalAmount.toNumber();
        let invoiceStatus = 'partial';
        if (newPaidAmount <= 0)
            invoiceStatus = 'refunded';
        else if (newPaidAmount >= invoiceTotal)
            invoiceStatus = 'paid';
        await this.prisma.invoice.update({
            where: { id: payment.invoiceId },
            data: {
                paidAmount: Math.max(0, newPaidAmount),
                status: invoiceStatus,
            },
        });
        return updatedPayment;
    }
    async generateInvoiceNumber(hospitalId) {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
        const prefix = `INV-${dateStr}`;
        const lastInvoice = await this.prisma.invoice.findFirst({
            where: {
                hospitalId,
                invoiceNumber: { startsWith: prefix },
            },
            orderBy: { invoiceNumber: 'desc' },
            select: { invoiceNumber: true },
        });
        let seq = 1;
        if (lastInvoice) {
            const lastSeq = parseInt(lastInvoice.invoiceNumber.split('-').pop() || '0', 10);
            seq = lastSeq + 1;
        }
        return `${prefix}-${String(seq).padStart(3, '0')}`;
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingService);
//# sourceMappingURL=billing.service.js.map