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
exports.LabService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LabService = class LabService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTest(dto, hospitalId) {
        return this.prisma.labTest.create({
            data: {
                hospitalId,
                name: dto.name,
                category: dto.category,
                description: dto.description,
                price: dto.price,
                turnaroundTime: dto.turnaroundTime,
            },
        });
    }
    async findAllTests(hospitalId) {
        return this.prisma.labTest.findMany({
            where: { hospitalId, isActive: true },
            orderBy: { name: 'asc' },
            include: {
                _count: { select: { labReports: true } },
            },
        });
    }
    async findOneTest(id) {
        const test = await this.prisma.labTest.findUnique({
            where: { id },
            include: {
                labReports: {
                    take: 20,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        medicalRecord: {
                            select: {
                                id: true,
                                patientId: true,
                                diagnosis: true,
                            },
                        },
                    },
                },
            },
        });
        if (!test)
            throw new common_1.NotFoundException('Lab test not found');
        return test;
    }
    async updateTest(id, dto) {
        await this.findOneTest(id);
        return this.prisma.labTest.update({
            where: { id },
            data: { ...dto },
        });
    }
    async removeTest(id) {
        await this.findOneTest(id);
        return this.prisma.labTest.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async createReport(dto, hospitalId) {
        const medicalRecord = await this.prisma.medicalRecord.findFirst({
            where: { id: dto.medicalRecordId, hospitalId },
        });
        if (!medicalRecord) {
            throw new common_1.BadRequestException('Medical record not found in this hospital');
        }
        const labTest = await this.prisma.labTest.findFirst({
            where: { id: dto.labTestId, hospitalId, isActive: true },
        });
        if (!labTest) {
            throw new common_1.BadRequestException('Lab test not found in this hospital');
        }
        return this.prisma.labReport.create({
            data: {
                hospitalId,
                medicalRecordId: dto.medicalRecordId,
                labTestId: dto.labTestId,
                result: dto.result,
                fileUrl: dto.fileUrl,
                status: dto.status || 'pending',
                completedAt: dto.status === 'completed' ? new Date() : null,
            },
            include: {
                labTest: { select: { id: true, name: true, category: true, price: true } },
                medicalRecord: {
                    select: { id: true, diagnosis: true },
                },
            },
        });
    }
    async findAllReports(hospitalId, filters) {
        const { patientId, status, dateFrom, dateTo, page = 1, limit = 10, } = filters;
        const skip = (page - 1) * limit;
        const where = {
            hospitalId,
            ...(status && { status }),
            ...(patientId && {
                medicalRecord: { patientId },
            }),
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
            this.prisma.labReport.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    labTest: { select: { id: true, name: true, category: true, price: true } },
                    medicalRecord: {
                        select: { id: true, diagnosis: true, patientId: true },
                    },
                },
            }),
            this.prisma.labReport.count({ where }),
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
    async updateReportStatus(id, dto) {
        const report = await this.prisma.labReport.findUnique({ where: { id } });
        if (!report)
            throw new common_1.NotFoundException('Lab report not found');
        const validTransitions = {
            pending: ['processing', 'completed'],
            processing: ['completed'],
            completed: [],
        };
        const allowed = validTransitions[report.status];
        if (!allowed || !allowed.includes(dto.status)) {
            throw new common_1.BadRequestException(`Cannot transition from '${report.status}' to '${dto.status}'`);
        }
        return this.prisma.labReport.update({
            where: { id },
            data: {
                status: dto.status,
                ...(dto.result && { result: dto.result }),
                ...(dto.fileUrl && { fileUrl: dto.fileUrl }),
                ...(dto.status === 'completed' && { completedAt: new Date() }),
            },
            include: {
                labTest: { select: { id: true, name: true, category: true } },
            },
        });
    }
    async getReportsByPatient(patientId) {
        const reports = await this.prisma.labReport.findMany({
            where: {
                medicalRecord: { patientId },
            },
            orderBy: { createdAt: 'desc' },
            include: {
                labTest: { select: { id: true, name: true, category: true, price: true } },
                medicalRecord: {
                    select: { id: true, diagnosis: true, createdAt: true },
                },
            },
        });
        return reports;
    }
};
exports.LabService = LabService;
exports.LabService = LabService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LabService);
//# sourceMappingURL=lab.service.js.map