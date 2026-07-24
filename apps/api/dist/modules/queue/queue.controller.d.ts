import { QueueService } from './queue.service';
import { AddTokenDto } from './dto/queue.dto';
export declare class QueueController {
    private queueService;
    constructor(queueService: QueueService);
    getTodayQueue(doctorId: string, date?: string): Promise<any>;
    addToken(doctorId: string, dto: AddTokenDto, date?: string): Promise<any>;
    callNext(queueId: string): Promise<any>;
    completeToken(tokenId: string): Promise<any>;
    cancelToken(tokenId: string): Promise<any>;
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
    updateQueueStatus(queueId: string, body: {
        status: string;
    }): Promise<any>;
    getMyToken(queueId: string, patientId: string): Promise<any>;
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
    testDb(): Promise<Record<string, any>>;
    killServer(): {
        message: string;
    };
}
