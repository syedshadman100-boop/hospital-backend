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
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let QueueService = class QueueService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateQueue(doctorId, date) {
        const doctor = await this.prisma.doctor.findUnique({ where: { id: doctorId } });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        const queueDate = new Date(date);
        if (isNaN(queueDate.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        queueDate.setHours(0, 0, 0, 0);
        let queue = await this.prisma.queue.findUnique({
            where: { doctorId_date: { doctorId, date: queueDate } },
        });
        if (!queue) {
            queue = await this.prisma.queue.create({
                data: {
                    hospitalId: doctor.hospitalId,
                    doctorId,
                    date: queueDate,
                },
            });
        }
        const tokens = await this.prisma.queueToken.findMany({
            where: { queueId: queue.id },
            orderBy: { tokenNumber: 'asc' },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
            },
        });
        return { ...queue, tokens };
    }
    async addToken(queueId, dto) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        if (queue.status === 'completed') {
            throw new common_1.BadRequestException('Queue is already completed');
        }
        const patient = await this.prisma.patient.findFirst({
            where: { id: dto.patientId, hospitalId: queue.hospitalId, isActive: true },
        });
        if (!patient)
            throw new common_1.BadRequestException('Patient not found in this hospital');
        if (dto.appointmentId) {
            const appointment = await this.prisma.appointment.findUnique({
                where: { id: dto.appointmentId },
            });
            if (!appointment)
                throw new common_1.BadRequestException('Appointment not found');
            const existingToken = await this.prisma.queueToken.findFirst({
                where: { appointmentId: dto.appointmentId },
            });
            if (existingToken) {
                throw new common_1.BadRequestException('This appointment already has a queue token');
            }
        }
        const lastToken = await this.prisma.queueToken.findFirst({
            where: { queueId },
            orderBy: { tokenNumber: 'desc' },
            select: { tokenNumber: true },
        });
        const tokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;
        const priority = dto.priority || 'normal';
        const emergencyPriority = priority === 'emergency' ? 0 : priority === 'urgent' ? 1 : 2;
        const waitingTokens = await this.prisma.queueToken.findMany({
            where: { queueId, status: 'waiting' },
            orderBy: [{ priority: 'asc' }, { tokenNumber: 'asc' }],
        });
        return this.prisma.queueToken.create({
            data: {
                queueId,
                patientId: dto.patientId,
                appointmentId: dto.appointmentId,
                tokenNumber,
                priority,
            },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
            },
        });
    }
    async getCurrentToken(queueId) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        const currentToken = await this.prisma.queueToken.findFirst({
            where: { queueId, status: 'serving' },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
            },
        });
        return currentToken || null;
    }
    async callNextToken(queueId) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        if (queue.status === 'completed') {
            throw new common_1.BadRequestException('Queue is already completed');
        }
        const currentServing = await this.prisma.queueToken.findFirst({
            where: { queueId, status: 'serving' },
        });
        if (currentServing) {
            throw new common_1.BadRequestException('There is already a token being served. Complete it first.');
        }
        const priorityOrder = { emergency: 0, urgent: 1, normal: 2 };
        const nextToken = await this.prisma.queueToken.findFirst({
            where: { queueId, status: 'waiting' },
            orderBy: [
                { priority: 'asc' },
                { tokenNumber: 'asc' },
            ],
        });
        if (!nextToken) {
            return { message: 'No more tokens waiting in the queue', token: null };
        }
        const updatedToken = await this.prisma.queueToken.update({
            where: { id: nextToken.id },
            data: {
                status: 'serving',
                calledAt: new Date(),
            },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
            },
        });
        await this.prisma.queue.update({
            where: { id: queueId },
            data: { currentToken: nextToken.tokenNumber },
        });
        return updatedToken;
    }
    async cancelToken(tokenId) {
        const token = await this.prisma.queueToken.findUnique({
            where: { id: tokenId },
        });
        if (!token)
            throw new common_1.NotFoundException('Queue token not found');
        if (token.status === 'completed' || token.status === 'cancelled') {
            throw new common_1.BadRequestException(`Token is already ${token.status}`);
        }
        return this.prisma.queueToken.update({
            where: { id: tokenId },
            data: { status: 'cancelled' },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async completeToken(tokenId) {
        const token = await this.prisma.queueToken.findUnique({
            where: { id: tokenId },
        });
        if (!token)
            throw new common_1.NotFoundException('Queue token not found');
        if (token.status !== 'serving') {
            throw new common_1.BadRequestException('Only a serving token can be completed');
        }
        return this.prisma.queueToken.update({
            where: { id: tokenId },
            data: {
                status: 'completed',
                completedAt: new Date(),
            },
            include: {
                patient: { select: { id: true, firstName: true, lastName: true } },
            },
        });
    }
    async getQueueStatus(queueId) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        const tokens = await this.prisma.queueToken.findMany({
            where: { queueId },
            orderBy: { tokenNumber: 'asc' },
        });
        const nowServing = tokens.find((t) => t.status === 'serving');
        const waitingTokens = tokens.filter((t) => t.status === 'waiting');
        const completedTokens = tokens.filter((t) => t.status === 'completed');
        const totalTokens = tokens.length;
        const estimatedTimePerToken = 15;
        const estimatedTime = waitingTokens.length * estimatedTimePerToken;
        return {
            queueId: queue.id,
            doctorId: queue.doctorId,
            date: queue.date,
            status: queue.status,
            currentToken: queue.currentToken,
            totalTokens,
            nowServing: nowServing
                ? {
                    tokenNumber: nowServing.tokenNumber,
                    patientId: nowServing.patientId,
                    calledAt: nowServing.calledAt,
                }
                : null,
            waiting: waitingTokens.map((t) => ({
                tokenNumber: t.tokenNumber,
                patientId: t.patientId,
                priority: t.priority,
                createdAt: t.createdAt,
            })),
            completedCount: completedTokens.length,
            estimatedWaitMinutes: estimatedTime,
        };
    }
    async getMyToken(patientId, queueId) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        const token = await this.prisma.queueToken.findFirst({
            where: { queueId, patientId },
            include: {
                queue: { select: { currentToken: true, status: true } },
            },
        });
        if (!token) {
            throw new common_1.NotFoundException('You do not have a token in this queue');
        }
        const tokensAhead = await this.prisma.queueToken.count({
            where: {
                queueId,
                status: 'waiting',
                tokenNumber: { lt: token.tokenNumber },
            },
        });
        return {
            ...token,
            tokensAhead,
            estimatedWaitMinutes: tokensAhead * 15,
        };
    }
    async updateQueueStatus(queueId, status) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        const validStatuses = ['running', 'break', 'completed', 'emergency'];
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Status must be one of: ${validStatuses.join(', ')}`);
        }
        return this.prisma.queue.update({
            where: { id: queueId },
            data: { status },
        });
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QueueService);
//# sourceMappingURL=queue.service.js.map