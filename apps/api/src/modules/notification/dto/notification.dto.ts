import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsEnum,
  IsObject,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export enum NotificationType {
  APPOINTMENT = 'appointment',
  PAYMENT = 'payment',
  SYSTEM = 'system',
  REMINDER = 'reminder',
}

export class CreateNotificationDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Appointment Confirmed' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Your appointment with Dr. Sharma has been confirmed.' })
  @IsString()
  message: string;

  @ApiProperty({ example: 'appointment', enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiPropertyOptional({ example: { appointmentId: 'uuid-123' } })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}

export class NotificationFilterDto {
  @ApiPropertyOptional({ example: 'appointment' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
