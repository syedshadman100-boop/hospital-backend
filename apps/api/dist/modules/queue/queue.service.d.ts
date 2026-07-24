import { PrismaService } from '../../prisma/prisma.service';
import { AddTokenDto } from './dto/queue.dto';
export declare class QueueService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateQueue(doctorId: string, date: string): Promise<any>;
    addToken(queueId: string, dto: AddTokenDto): Promise<any>;
    getCurrentToken(queueId: string): Promise<any>;
    callNextToken(queueId: string): Promise<any>;
    cancelToken(tokenId: string): Promise<any>;
    completeToken(tokenId: string): Promise<any>;
    getQueueStatus(queueId: string): Promise<{
        queueId: any;
        doctorId: any;
        date: any;
        status: any;
        currentToken: any;
        totalTokens: number;
        nowServing: {
            tokenNumber: any;
            patientId: any;
            calledAt: any;
        } | null;
        waiting: {
            tokenNumber: any;
            patientId: any;
            priority: any;
            createdAt: any;
        }[];
        completedCount: number;
        estimatedWaitMinutes: number;
    }>;
    getMyToken(patientId: string, queueId: string): Promise<any>;
    updateQueueStatus(queueId: string, status: string): Promise<any>;
    trackQueueByPhone(phone: string): Promise<{
        id: any;
        tokenNumber: any;
        status: any;
        patientName: string;
        doctorName: string;
        departmentId: any;
        tokensAhead: number;
        estimatedWaitMinutes: number;
        currentlyServing: any;
    }[]>;
}
