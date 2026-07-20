import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto, NotificationFilterDto } from './dto/notification.dto';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateNotificationDto): Promise<{
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        message: string;
        isRead: boolean;
        channel: string | null;
        sentAt: Date | null;
    }>;
    findAll(userId: string, filters: NotificationFilterDto): Promise<{
        data: {
            type: string;
            title: string;
            id: string;
            createdAt: Date;
            userId: string;
            data: import("@prisma/client/runtime/client").JsonValue | null;
            message: string;
            isRead: boolean;
            channel: string | null;
            sentAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    markAsRead(id: string): Promise<{
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        message: string;
        isRead: boolean;
        channel: string | null;
        sentAt: Date | null;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    sendNotification(userId: string, title: string, message: string, type: string, data?: Record<string, any>): Promise<{
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        message: string;
        isRead: boolean;
        channel: string | null;
        sentAt: Date | null;
    }>;
}
