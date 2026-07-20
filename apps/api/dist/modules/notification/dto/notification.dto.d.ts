export declare enum NotificationType {
    APPOINTMENT = "appointment",
    PAYMENT = "payment",
    SYSTEM = "system",
    REMINDER = "reminder"
}
export declare class CreateNotificationDto {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    data?: Record<string, any>;
}
export declare class NotificationFilterDto {
    type?: string;
    isRead?: boolean;
    page?: number;
    limit?: number;
}
