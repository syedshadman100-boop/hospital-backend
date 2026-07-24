import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto, NotificationFilterDto } from './dto/notification.dto';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateNotificationDto): Promise<any>;
    findAll(userId: string, filters: NotificationFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    markAsRead(id: string): Promise<any>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    sendNotification(userId: string, title: string, message: string, type: string, data?: Record<string, any>): Promise<any>;
}
