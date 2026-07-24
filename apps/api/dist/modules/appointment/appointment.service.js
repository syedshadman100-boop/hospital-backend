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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AppointmentService = class AppointmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async publicCreate(dto) {
        const hospital = await this.prisma.hospital.findFirst({ where: { isActive: true } });
        if (!hospital)
            throw new common_1.BadRequestException('No active hospital found');
        const doctor = await this.prisma.doctor.findFirst({
            where: { id: dto.doctorId, hospitalId: hospital.id, isAvailable: true },
        });
        if (!doctor)
            throw new common_1.BadRequestException('Doctor not found or not available');
        let patient = await this.prisma.patient.findFirst({
            where: { phone: dto.phone, hospitalId: hospital.id },
        });
        if (!patient) {
            const birthYear = new Date().getFullYear() - dto.age;
            patient = await this.prisma.patient.create({
                data: {
                    hospitalId: hospital.id,
                    firstName: dto.fullName.split(' ')[0] || dto.fullName,
                    lastName: dto.fullName.split(' ').slice(1).join(' ') || '',
                    phone: dto.phone,
                    email: dto.email,
                    dateOfBirth: new Date(birthYear, 0, 1),
                    gender: dto.gender,
                    isActive: true,
                },
            });
        }
        const appointmentDate = new Date(dto.appointmentDate);
        if (isNaN(appointmentDate.getTime())) {
            throw new common_1.BadRequestException('Invalid appointment date');
        }
        const match = dto.timeSlot.match(/(\d{2}):(\d{2})\s*(AM|PM)/i);
        if (!match)
            throw new common_1.BadRequestException('Invalid time slot format. Use "02:00 PM"');
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const period = match[3].toUpperCase();
        if (period === 'PM' && hours !== 12)
            hours += 12;
        if (period === 'AM' && hours === 12)
            hours = 0;
        const startTime = `${String(hours).padStart(2, '0')}:${minutes}`;
        const endHours = hours + 1;
        const endTime = `${String(endHours).padStart(2, '0')}:${minutes}`;
        const appointment = await this.prisma.appointment.create({
            data: {
                hospitalId: hospital.id,
                patientId: patient.id,
                doctorId: dto.doctorId,
                appointmentDate,
                startTime,
                endTime,
                consultationType: 'offline',
                reason: dto.reason,
                status: 'scheduled',
            },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
                doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
            },
        });
        return {
            success: true,
            message: 'Appointment booked successfully',
            reference: `APT-${appointment.id.slice(-8).toUpperCase()}`,
            appointment,
        };
    }
    async create(dto, hospitalId) {
        const patient = await this.prisma.patient.findFirst({
            where: { id: dto.patientId, hospitalId, isActive: true },
        });
        if (!patient) {
            throw new common_1.BadRequestException('Patient not found in this hospital');
        }
        const doctor = await this.prisma.doctor.findFirst({
            where: { id: dto.doctorId, hospitalId, isAvailable: true },
        });
        if (!doctor) {
            throw new common_1.BadRequestException('Doctor not found or not available in this hospital');
        }
        const appointmentDate = new Date(dto.appointmentDate);
        if (isNaN(appointmentDate.getTime())) {
            throw new common_1.BadRequestException('Invalid appointment date');
        }
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(dto.startTime) || !timeRegex.test(dto.endTime)) {
            throw new common_1.BadRequestException('Time must be in HH:MM format (24-hour)');
        }
        if (dto.startTime >= dto.endTime) {
            throw new common_1.BadRequestException('startTime must be before endTime');
        }
        const dayOfWeek = appointmentDate.getDay();
        const schedule = await this.prisma.doctorSchedule.findUnique({
            where: { doctorId_dayOfWeek: { doctorId: dto.doctorId, dayOfWeek } },
        });
        if (!schedule || !schedule.isActive) {
            throw new common_1.BadRequestException('Doctor is not available on this day');
        }
        if (dto.startTime < schedule.startTime || dto.endTime > schedule.endTime) {
            throw new common_1.BadRequestException(`Slot must be within doctor's schedule: ${schedule.startTime} - ${schedule.endTime}`);
        }
        const conflicting = await this.prisma.appointment.findFirst({
            where: {
                doctorId: dto.doctorId,
                appointmentDate,
                status: { in: ['scheduled', 'confirmed', 'in_progress'] },
                startTime: { lt: dto.endTime },
                endTime: { gt: dto.startTime },
            },
        });
        if (conflicting) {
            throw new common_1.ConflictException('Doctor already has an appointment in this time slot');
        }
        const appointment = await this.prisma.appointment.create({
            data: {
                hospitalId,
                patientId: dto.patientId,
                doctorId: dto.doctorId,
                appointmentDate,
                startTime: dto.startTime,
                endTime: dto.endTime,
                consultationType: dto.consultationType || 'offline',
                reason: dto.reason,
            },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
                doctor: { select: { id: true, firstName: true, lastName: true, specialization: true } },
            },
        });
        if (dto.consultationType !== 'online') {
            const queue = await this.getOrCreateQueue(dto.doctorId, appointmentDate);
            const tokenNumber = await this.getNextTokenNumber(queue.id);
            const queueToken = await this.prisma.queueToken.create({
                data: {
                    queueId: queue.id,
                    patientId: dto.patientId,
                    appointmentId: appointment.id,
                    tokenNumber,
                    priority: dto.consultationType === 'emergency' ? 'emergency' : 'normal',
                },
            });
            await this.prisma.appointment.update({
                where: { id: appointment.id },
                data: { queueTokenId: queueToken.id },
            });
            return { ...appointment, queueToken };
        }
        return appointment;
    }
    async findAll(hospitalId, filters) {
        const { doctorId, patientId, status, consultationType, dateFrom, dateTo, page = 1, limit = 10, } = filters;
        const skip = (page - 1) * limit;
        const where = {
            hospitalId,
            ...(doctorId && { doctorId }),
            ...(patientId && { patientId }),
            ...(status && { status }),
            ...(consultationType && { consultationType }),
            ...(dateFrom || dateTo
                ? {
                    appointmentDate: {
                        ...(dateFrom && { gte: new Date(dateFrom) }),
                        ...(dateTo && { lte: new Date(dateTo + 'T23:59:59.999Z') }),
                    },
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.appointment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { appointmentDate: 'desc' },
                include: {
                    patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
                    doctor: { select: { id: true, userId: true, firstName: true, lastName: true, specialization: true } },
                },
            }),
            this.prisma.appointment.count({ where }),
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
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        email: true,
                        gender: true,
                        dateOfBirth: true,
                    },
                },
                doctor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        specialization: true,
                        consultationFee: true,
                    },
                },
                medicalRecord: true,
                invoice: {
                    select: {
                        id: true,
                        invoiceNumber: true,
                        totalAmount: true,
                        paidAmount: true,
                        status: true,
                    },
                },
                queueToken: {
                    select: {
                        tokenNumber: true,
                        status: true,
                        priority: true,
                    },
                },
            },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        return appointment;
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (dto.status) {
            const validTransitions = {
                scheduled: ['confirmed', 'cancelled', 'no_show'],
                confirmed: ['in_progress', 'cancelled', 'no_show'],
                in_progress: ['completed', 'cancelled'],
                completed: [],
                cancelled: [],
                no_show: [],
            };
            const allowed = validTransitions[existing.status];
            if (!allowed || !allowed.includes(dto.status)) {
                throw new common_1.BadRequestException(`Cannot transition from '${existing.status}' to '${dto.status}'`);
            }
        }
        if (dto.status === 'cancelled' && !dto.cancelReason) {
            throw new common_1.BadRequestException('cancelReason is required when cancelling an appointment');
        }
        const updateData = { ...dto };
        if (dto.status === 'cancelled' && existing.queueTokenId) {
            await this.prisma.queueToken.update({
                where: { id: existing.queueTokenId },
                data: { status: 'cancelled' },
            });
        }
        if (dto.status === 'in_progress' && existing.queueTokenId) {
            await this.prisma.queueToken.update({
                where: { id: existing.queueTokenId },
                data: { status: 'serving', calledAt: new Date() },
            });
        }
        if (dto.status === 'completed' && existing.queueTokenId) {
            await this.prisma.queueToken.update({
                where: { id: existing.queueTokenId },
                data: { status: 'completed', completedAt: new Date() },
            });
            await this.prisma.doctor.update({
                where: { id: existing.doctor.id },
                data: { totalPatients: { increment: 1 } },
            });
        }
        return this.prisma.appointment.update({
            where: { id },
            data: updateData,
            include: {
                patient: { select: { id: true, firstName: true, lastName: true } },
                doctor: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async getTodayAppointments(doctorId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const doctor = await this.prisma.doctor.findUnique({ where: { id: doctorId } });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        return this.prisma.appointment.findMany({
            where: {
                doctorId,
                appointmentDate: { gte: today, lt: tomorrow },
            },
            orderBy: { startTime: 'asc' },
            include: {
                patient: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
                queueToken: {
                    select: { tokenNumber: true, status: true, priority: true },
                },
            },
        });
    }
    async cancel(id, reason) {
        const appointment = await this.findOne(id);
        if (appointment.status === 'completed' || appointment.status === 'cancelled') {
            throw new common_1.BadRequestException(`Cannot cancel an appointment with status '${appointment.status}'`);
        }
        if (appointment.queueTokenId) {
            await this.prisma.queueToken.updateMany({
                where: { id: appointment.queueTokenId },
                data: { status: 'cancelled' },
            });
        }
        return this.prisma.appointment.update({
            where: { id },
            data: {
                status: 'cancelled',
                cancelReason: reason,
            },
        });
    }
    async getOrCreateQueue(doctorId, date) {
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        const doctor = await this.prisma.doctor.findUnique({ where: { id: doctorId } });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        let queue = await this.prisma.queue.findUnique({
            where: { doctorId_date: { doctorId, date: normalizedDate } },
        });
        if (!queue) {
            queue = await this.prisma.queue.create({
                data: {
                    hospitalId: doctor.hospitalId,
                    doctorId,
                    date: normalizedDate,
                },
            });
        }
        return queue;
    }
    async getNextTokenNumber(queueId) {
        const lastToken = await this.prisma.queueToken.findFirst({
            where: { queueId },
            orderBy: { tokenNumber: 'desc' },
            select: { tokenNumber: true },
        });
        return lastToken ? lastToken.tokenNumber + 1 : 1;
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map