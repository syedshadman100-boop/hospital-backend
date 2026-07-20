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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PatientService = class PatientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(hospitalId, filters) {
        const { search, bloodGroup, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {
            hospitalId,
            isActive: true,
            ...(bloodGroup && { bloodGroup }),
            ...(search && {
                OR: [
                    { firstName: { contains: search } },
                    { lastName: { contains: search } },
                    { email: { contains: search } },
                    { phone: { contains: search } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.patient.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: {
                        select: { appointments: true, medicalRecords: true, invoices: true },
                    },
                },
            }),
            this.prisma.patient.count({ where }),
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
        const patient = await this.prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: {
                    orderBy: { appointmentDate: 'desc' },
                    take: 10,
                    include: {
                        doctor: {
                            select: { id: true, firstName: true, lastName: true, specialization: true },
                        },
                    },
                },
                medicalRecords: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                    include: {
                        prescriptions: true,
                    },
                },
                invoices: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                    select: {
                        id: true,
                        invoiceNumber: true,
                        totalAmount: true,
                        paidAmount: true,
                        status: true,
                        createdAt: true,
                    },
                },
                familyMembers: true,
                documents: true,
            },
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        return patient;
    }
    async create(dto, hospitalId) {
        if (dto.email) {
            const existingPatient = await this.prisma.patient.findFirst({
                where: { email: dto.email, hospitalId },
            });
            if (existingPatient) {
                throw new common_1.ConflictException('A patient with this email already exists in this hospital');
            }
        }
        return this.prisma.patient.create({
            data: {
                hospitalId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                phone: dto.phone,
                gender: dto.gender,
                dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
                bloodGroup: dto.bloodGroup,
                address: dto.address,
                city: dto.city,
                state: dto.state,
                pincode: dto.pincode,
                nationality: dto.nationality,
                emergencyContactName: dto.emergencyContactName,
                emergencyContactPhone: dto.emergencyContactPhone,
                emergencyContactRelation: dto.emergencyContactRelation,
                insuranceProvider: dto.insuranceProvider,
                insurancePolicyNumber: dto.insurancePolicyNumber,
                allergies: dto.allergies,
                medicalHistory: dto.medicalHistory,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.email) {
            const existingPatient = await this.prisma.patient.findFirst({
                where: { email: dto.email, id: { not: id } },
            });
            if (existingPatient) {
                throw new common_1.ConflictException('A patient with this email already exists');
            }
        }
        const updateData = { ...dto };
        if (dto.dateOfBirth) {
            updateData.dateOfBirth = new Date(dto.dateOfBirth);
        }
        return this.prisma.patient.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.patient.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async getPatientHistory(patientId) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            select: { id: true, firstName: true, lastName: true, phone: true, email: true },
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const [appointments, medicalRecords, invoices] = await Promise.all([
            this.prisma.appointment.findMany({
                where: { patientId },
                orderBy: { appointmentDate: 'desc' },
                include: {
                    doctor: {
                        select: { id: true, firstName: true, lastName: true, specialization: true },
                    },
                },
            }),
            this.prisma.medicalRecord.findMany({
                where: { patientId },
                orderBy: { createdAt: 'desc' },
                include: {
                    prescriptions: true,
                    labReports: {
                        include: { labTest: { select: { id: true, name: true, category: true } } },
                    },
                },
            }),
            this.prisma.invoice.findMany({
                where: { patientId },
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    invoiceNumber: true,
                    totalAmount: true,
                    paidAmount: true,
                    status: true,
                    createdAt: true,
                },
            }),
        ]);
        const timeline = [
            ...appointments.map((a) => ({
                type: 'appointment',
                date: a.appointmentDate,
                data: a,
            })),
            ...medicalRecords.map((r) => ({
                type: 'medical_record',
                date: r.createdAt,
                data: r,
            })),
            ...invoices.map((i) => ({
                type: 'invoice',
                date: i.createdAt,
                data: i,
            })),
        ];
        timeline.sort((a, b) => b.date.getTime() - a.date.getTime());
        return { patient, timeline };
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientService);
//# sourceMappingURL=patient.service.js.map