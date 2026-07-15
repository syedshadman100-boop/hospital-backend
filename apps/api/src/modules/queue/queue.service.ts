import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddTokenDto } from './dto/queue.dto';

@Injectable()
export class QueueService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateQueue(doctorId: string, date: string) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const queueDate = new Date(date);
    if (isNaN(queueDate.getTime())) {
      throw new BadRequestException('Invalid date format');
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

  async addToken(queueId: string, dto: AddTokenDto) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
    });
    if (!queue) throw new NotFoundException('Queue not found');

    if (queue.status === 'completed') {
      throw new BadRequestException('Queue is already completed');
    }

    const patient = await this.prisma.patient.findFirst({
      where: { id: dto.patientId, hospitalId: queue.hospitalId, isActive: true },
    });
    if (!patient) throw new BadRequestException('Patient not found in this hospital');

    if (dto.appointmentId) {
      const appointment = await this.prisma.appointment.findUnique({
        where: { id: dto.appointmentId },
      });
      if (!appointment) throw new BadRequestException('Appointment not found');

      const existingToken = await this.prisma.queueToken.findFirst({
        where: { appointmentId: dto.appointmentId },
      });
      if (existingToken) {
        throw new BadRequestException('This appointment already has a queue token');
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

  async getCurrentToken(queueId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
    });
    if (!queue) throw new NotFoundException('Queue not found');

    const currentToken = await this.prisma.queueToken.findFirst({
      where: { queueId, status: 'serving' },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
      },
    });

    return currentToken || null;
  }

  async callNextToken(queueId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
    });
    if (!queue) throw new NotFoundException('Queue not found');

    if (queue.status === 'completed') {
      throw new BadRequestException('Queue is already completed');
    }

    const currentServing = await this.prisma.queueToken.findFirst({
      where: { queueId, status: 'serving' },
    });

    if (currentServing) {
      throw new BadRequestException('There is already a token being served. Complete it first.');
    }

    const priorityOrder: Record<string, number> = { emergency: 0, urgent: 1, normal: 2 };
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

  async cancelToken(tokenId: string) {
    const token = await this.prisma.queueToken.findUnique({
      where: { id: tokenId },
    });
    if (!token) throw new NotFoundException('Queue token not found');

    if (token.status === 'completed' || token.status === 'cancelled') {
      throw new BadRequestException(`Token is already ${token.status}`);
    }

    return this.prisma.queueToken.update({
      where: { id: tokenId },
      data: { status: 'cancelled' },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async completeToken(tokenId: string) {
    const token = await this.prisma.queueToken.findUnique({
      where: { id: tokenId },
    });
    if (!token) throw new NotFoundException('Queue token not found');

    if (token.status !== 'serving') {
      throw new BadRequestException('Only a serving token can be completed');
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

  async getQueueStatus(queueId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
    });
    if (!queue) throw new NotFoundException('Queue not found');

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

  async getMyToken(patientId: string, queueId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
    });
    if (!queue) throw new NotFoundException('Queue not found');

    const token = await this.prisma.queueToken.findFirst({
      where: { queueId, patientId },
      include: {
        queue: { select: { currentToken: true, status: true } },
      },
    });

    if (!token) {
      throw new NotFoundException('You do not have a token in this queue');
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

  async updateQueueStatus(queueId: string, status: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
    });
    if (!queue) throw new NotFoundException('Queue not found');

    const validStatuses = ['running', 'break', 'completed', 'emergency'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Status must be one of: ${validStatuses.join(', ')}`);
    }

    return this.prisma.queue.update({
      where: { id: queueId },
      data: { status },
    });
  }
}
