import { NotificationService } from './notification.service';
import { CreateNotificationDto, NotificationFilterDto } from './dto/notification.dto';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    findAll(user: any, filters: NotificationFilterDto): Promise<{
        data: any[];
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
    markAsRead(id: string): Promise<any>;
    markAllAsRead(user: any): Promise<{
        message: string;
    }>;
    create(dto: CreateNotificationDto): Promise<any>;
}
