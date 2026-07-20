import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsDateString,
  Min,
  Max,
  IsEmail,
  IsNumberString,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'uuid-of-patient' })
  @IsString()
  patientId: string;

  @ApiProperty({ example: 'uuid-of-doctor' })
  @IsString()
  doctorId: string;

  @ApiProperty({ example: '2025-07-20' })
  @IsDateString()
  appointmentDate: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '10:30' })
  @IsString()
  endTime: string;

  @ApiPropertyOptional({ example: 'offline', enum: ['offline', 'online', 'emergency'] })
  @IsOptional()
  @IsString()
  consultationType?: string;

  @ApiPropertyOptional({ example: 'Persistent headache for 3 days' })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ example: 'confirmed', enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'] })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'Patient requested cancellation' })
  @IsOptional()
  @IsString()
  cancelReason?: string;

  @ApiPropertyOptional({ example: 'Follow-up in 2 weeks' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class AppointmentFilterDto {
  @ApiPropertyOptional({ example: 'uuid-of-doctor' })
  @IsOptional()
  @IsString()
  doctorId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-patient' })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional({ example: 'scheduled', enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'] })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'offline', enum: ['offline', 'online', 'emergency'] })
  @IsOptional()
  @IsString()
  consultationType?: string;

  @ApiPropertyOptional({ example: '2025-07-01' })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiPropertyOptional({ example: '2025-07-31' })
  @IsOptional()
  @IsString()
  dateTo?: string;

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

export class PublicCreateAppointmentDto {
  @ApiProperty({ example: 'uuid-of-doctor' })
  @IsString()
  doctorId: string;

  @ApiProperty({ example: '2025-07-20' })
  @IsDateString()
  appointmentDate: string;

  @ApiProperty({ example: '02:00 PM' })
  @IsString()
  timeSlot: string;

  @ApiProperty({ example: 'Syed' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'syed@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @ApiProperty({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsString()
  gender: string;

  @ApiPropertyOptional({ example: 'Chest pain since 2 days' })
  @IsOptional()
  @IsString()
  reason?: string;
}
