import { NotificationService } from './notification.service';
import { CreateNotificationDto, NotificationFilterDto } from './dto/notification.dto';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    findAll(user: any, filters: NotificationFilterDto): Promise<{
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
    getUnreadCount(user: any): Promise<{
        count: number;
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
    markAllAsRead(user: any): Promise<{
        message: string;
    }>;
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
}
