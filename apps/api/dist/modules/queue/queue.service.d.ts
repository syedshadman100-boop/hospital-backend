import { PrismaService } from '../../prisma/prisma.service';
import { AddTokenDto } from './dto/queue.dto';
export declare class QueueService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateQueue(doctorId: string, date: string): Promise<{
        tokens: ({
            patient: {
                firstName: string;
                lastName: string;
                phone: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            appointmentId: string | null;
            status: string;
            completedAt: Date | null;
            tokenNumber: number;
            priority: string;
            estimatedTime: number | null;
            calledAt: Date | null;
            queueId: string;
        })[];
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        date: Date;
        status: string;
        currentToken: number;
    }>;
    addToken(queueId: string, dto: AddTokenDto): Promise<{
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        status: string;
        completedAt: Date | null;
        tokenNumber: number;
        priority: string;
        estimatedTime: number | null;
        calledAt: Date | null;
        queueId: string;
    }>;
    getCurrentToken(queueId: string): Promise<({
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        status: string;
        completedAt: Date | null;
        tokenNumber: number;
        priority: string;
        estimatedTime: number | null;
        calledAt: Date | null;
        queueId: string;
    }) | null>;
    callNextToken(queueId: string): Promise<({
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        status: string;
        completedAt: Date | null;
        tokenNumber: number;
        priority: string;
        estimatedTime: number | null;
        calledAt: Date | null;
        queueId: string;
    }) | {
        message: string;
        token: null;
    }>;
    cancelToken(tokenId: string): Promise<{
        patient: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        status: string;
        completedAt: Date | null;
        tokenNumber: number;
        priority: string;
        estimatedTime: number | null;
        calledAt: Date | null;
        queueId: string;
    }>;
    completeToken(tokenId: string): Promise<{
        patient: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        status: string;
        completedAt: Date | null;
        tokenNumber: number;
        priority: string;
        estimatedTime: number | null;
        calledAt: Date | null;
        queueId: string;
    }>;
    getQueueStatus(queueId: string): Promise<{
        queueId: string;
        doctorId: string;
        date: Date;
        status: string;
        currentToken: number;
        totalTokens: number;
        nowServing: {
            tokenNumber: number;
            patientId: string;
            calledAt: Date | null;
        } | null;
        waiting: {
            tokenNumber: number;
            patientId: string;
            priority: string;
            createdAt: Date;
        }[];
        completedCount: number;
        estimatedWaitMinutes: number;
    }>;
    getMyToken(patientId: string, queueId: string): Promise<{
        tokensAhead: number;
        estimatedWaitMinutes: number;
        queue: {
            status: string;
            currentToken: number;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        appointmentId: string | null;
        status: string;
        completedAt: Date | null;
        tokenNumber: number;
        priority: string;
        estimatedTime: number | null;
        calledAt: Date | null;
        queueId: string;
    }>;
    updateQueueStatus(queueId: string, status: string): Promise<{
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        date: Date;
        status: string;
        currentToken: number;
    }>;
}
