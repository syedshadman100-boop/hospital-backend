import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateQueueDto {
  @ApiProperty({ example: 'uuid-of-doctor' })
  @IsString()
  doctorId: string;
}

export class AddTokenDto {
  @ApiProperty({ example: 'uuid-of-patient' })
  @IsString()
  patientId: string;

  @ApiPropertyOptional({ example: 'uuid-of-appointment' })
  @IsOptional()
  @IsString()
  appointmentId?: string;

  @ApiPropertyOptional({ example: 'normal', enum: ['normal', 'urgent', 'emergency'] })
  @IsOptional()
  @IsString()
  priority?: string;
}

export class UpdateTokenDto {
  @ApiProperty({ example: 'completed', enum: ['waiting', 'serving', 'completed', 'cancelled', 'no_show'] })
  @IsString()
  status: string;
}
