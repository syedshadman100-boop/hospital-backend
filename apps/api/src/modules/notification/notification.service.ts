import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateNotificationDto,
  NotificationFilterDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId: dto.userId,
        title: dto.title,
        message: dto.message,
        type: dto.type,
        data: dto.data ?? undefined,
        sentAt: new Date(),
      },
    });
  }

  async findAll(userId: string, filters: NotificationFilterDto) {
    const { type, isRead, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      userId,
      ...(type && { type }),
      ...(isRead !== undefined && { isRead }),
    };

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) throw new NotFoundException('Notification not found');

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { message: 'All notifications marked as read' };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });
    return { count };
  }

  async sendNotification(
    userId: string,
    title: string,
    message: string,
    type: string,
    data?: Record<string, any>,
  ) {
    return this.create({
      userId,
      title,
      message,
      type: type as any,
      data,
    });
  }
}
