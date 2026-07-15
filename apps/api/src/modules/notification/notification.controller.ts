import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  NotificationFilterDto,
} from './dto/notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get user notifications' })
  findAll(@CurrentUser() user: any, @Query() filters: NotificationFilterDto) {
    return this.notificationService.findAll(user.id, filters);
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notification count' })
  getUnreadCount(@CurrentUser() user: any) {
    return this.notificationService.getUnreadCount(user.id);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Put('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllAsRead(@CurrentUser() user: any) {
    return this.notificationService.markAllAsRead(user.id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiOperation({ summary: 'Send notification (admin)' })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }
}
