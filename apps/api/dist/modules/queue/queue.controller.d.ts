import { QueueService } from './queue.service';
import { AddTokenDto } from './dto/queue.dto';
export declare class QueueController {
    private queueService;
    constructor(queueService: QueueService);
    getTodayQueue(doctorId: string, date?: string): Promise<{
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
    addToken(doctorId: string, dto: AddTokenDto, date?: string): Promise<{
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
    callNext(queueId: string): Promise<({
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
    updateQueueStatus(queueId: string, body: {
        status: string;
    }): Promise<{
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        date: Date;
        status: string;
        currentToken: number;
    }>;
    getMyToken(queueId: string, patientId: string): Promise<{
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
}
