import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsArray,
  IsBoolean,
  ValidateNested,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class VitalsDto {
  @ApiPropertyOptional({ example: 98.6 })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiPropertyOptional({ example: '120/80' })
  @IsOptional()
  @IsString()
  bp?: string;

  @ApiPropertyOptional({ example: 72 })
  @IsOptional()
  @IsNumber()
  heartRate?: number;

  @ApiPropertyOptional({ example: 70 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ example: 175 })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiPropertyOptional({ example: 98 })
  @IsOptional()
  @IsNumber()
  oxygenSaturation?: number;
}

export class CreateMedicalRecordDto {
  @ApiPropertyOptional({ example: 'uuid-appointment-id' })
  @IsOptional()
  @IsString()
  appointmentId?: string;

  @ApiProperty({ example: 'Patient ID' })
  @IsString()
  patientId: string;

  @ApiProperty({ example: 'Viral fever with mild cough' })
  @IsString()
  diagnosis: string;

  @ApiPropertyOptional({ example: 'Fever, cough, body ache' })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiPropertyOptional({ example: 'Prescribed antibiotics for 5 days' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ type: VitalsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VitalsDto)
  vitals?: VitalsDto;

  @ApiPropertyOptional({ example: '2026-07-28' })
  @IsOptional()
  @IsString()
  followUpDate?: string;
}

export class PrescriptionItemDto {
  @ApiProperty({ example: 'Amoxicillin' })
  @IsString()
  medicineName: string;

  @ApiProperty({ example: '500mg' })
  @IsString()
  dosage: string;

  @ApiProperty({ example: 'Three times a day' })
  @IsString()
  frequency: string;

  @ApiProperty({ example: '5 days' })
  @IsString()
  duration: string;

  @ApiPropertyOptional({ example: 'Take with plenty of water' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isBeforeFood?: boolean;
}

export class CreatePrescriptionDto {
  @ApiProperty({ example: 'uuid-medical-record-id' })
  @IsString()
  medicalRecordId: string;

  @ApiProperty({ type: [PrescriptionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionItemDto)
  prescriptions: PrescriptionItemDto[];
}

export class MedicalRecordFilterDto {
  @ApiPropertyOptional({ example: 'uuid-patient-id' })
  @IsOptional()
  @IsString()
  patientId?: string;

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
  limit?: number;
}
