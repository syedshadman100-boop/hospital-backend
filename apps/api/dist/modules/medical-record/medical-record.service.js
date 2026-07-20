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
exports.MedicalRecordService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MedicalRecordService = class MedicalRecordService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, hospitalId) {
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
            const existing = await this.prisma.medicalRecord.findFirst({
                where: { appointmentId: dto.appointmentId },
            });
            if (existing) {
                throw new common_1.BadRequestException('A medical record already exists for this appointment');
            }
        }
        return this.prisma.medicalRecord.create({
            data: {
                hospitalId,
                patientId: dto.patientId,
                appointmentId: dto.appointmentId || null,
                diagnosis: dto.diagnosis,
                symptoms: dto.symptoms,
                notes: dto.notes,
                vitals: dto.vitals ? JSON.parse(JSON.stringify(dto.vitals)) : undefined,
                followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : null,
            },
            include: {
                patient: {
                    select: { id: true, firstName: true, lastName: true, phone: true },
                },
                appointment: {
                    select: { id: true, appointmentDate: true, startTime: true },
                },
                prescriptions: true,
            },
        });
    }
    async findAll(hospitalId, filters) {
        const { patientId, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {
            hospitalId,
            ...(patientId && { patientId }),
        };
        const [data, total] = await Promise.all([
            this.prisma.medicalRecord.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    patient: {
                        select: { id: true, firstName: true, lastName: true, phone: true },
                    },
                    appointment: {
                        select: { id: true, appointmentDate: true, startTime: true },
                    },
                    prescriptions: true,
                    _count: { select: { labReports: true } },
                },
            }),
            this.prisma.medicalRecord.count({ where }),
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
        const record = await this.prisma.medicalRecord.findUnique({
            where: { id },
            include: {
                patient: {
                    select: { id: true, firstName: true, lastName: true, phone: true, email: true, gender: true, dateOfBirth: true },
                },
                appointment: {
                    select: { id: true, appointmentDate: true, startTime: true, endTime: true, consultationType: true },
                },
                prescriptions: true,
                labReports: {
                    include: {
                        labTest: { select: { id: true, name: true, category: true, price: true } },
                    },
                },
            },
        });
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        return record;
    }
    async addPrescriptions(dto) {
        const record = await this.prisma.medicalRecord.findUnique({
            where: { id: dto.medicalRecordId },
        });
        if (!record)
            throw new common_1.NotFoundException('Medical record not found');
        const created = await this.prisma.prescription.createMany({
            data: dto.prescriptions.map((p) => ({
                medicalRecordId: dto.medicalRecordId,
                medicineName: p.medicineName,
                dosage: p.dosage,
                frequency: p.frequency,
                duration: p.duration,
                instructions: p.instructions,
                isBeforeFood: p.isBeforeFood ?? true,
            })),
        });
        return this.prisma.prescription.findMany({
            where: { medicalRecordId: dto.medicalRecordId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPatientTimeline(patientId) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            select: { id: true, firstName: true, lastName: true, phone: true, email: true },
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const records = await this.prisma.medicalRecord.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
            include: {
                prescriptions: true,
                labReports: {
                    include: {
                        labTest: { select: { id: true, name: true, category: true } },
                    },
                },
            },
        });
        const timeline = records.map((r) => ({
            type: 'medical_record',
            date: r.createdAt,
            data: r,
        }));
        timeline.sort((a, b) => b.date.getTime() - a.date.getTime());
        return { patient, timeline };
    }
};
exports.MedicalRecordService = MedicalRecordService;
exports.MedicalRecordService = MedicalRecordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicalRecordService);
//# sourceMappingURL=medical-record.service.js.map