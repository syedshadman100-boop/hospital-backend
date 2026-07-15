import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsArray,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLabTestDto {
  @ApiProperty({ example: 'Complete Blood Count' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Hematology' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Measures RBC, WBC, platelet count' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: '2-4 hours' })
  @IsOptional()
  @IsString()
  turnaroundTime?: string;
}

export class UpdateLabTestDto extends PartialType(CreateLabTestDto) {}

export class CreateLabReportDto {
  @ApiProperty({ example: 'uuid-medical-record-id' })
  @IsString()
  medicalRecordId: string;

  @ApiProperty({ example: 'uuid-lab-test-id' })
  @IsString()
  labTestId: string;

  @ApiPropertyOptional({ example: 'WBC: 7000, RBC: 4.5M' })
  @IsOptional()
  @IsString()
  result?: string;

  @ApiPropertyOptional({ example: 'https://storage.example.com/report.pdf' })
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiPropertyOptional({ example: 'pending', enum: ['pending', 'processing', 'completed'] })
  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateLabReportStatusDto {
  @ApiProperty({ example: 'completed', enum: ['pending', 'processing', 'completed'] })
  @IsString()
  status: string;

  @ApiPropertyOptional({ example: 'WBC: 7000, RBC: 4.5M, Hemoglobin: 13.5' })
  @IsOptional()
  @IsString()
  result?: string;

  @ApiPropertyOptional({ example: 'https://storage.example.com/report.pdf' })
  @IsOptional()
  @IsString()
  fileUrl?: string;
}

export class LabReportFilterDto {
  @ApiPropertyOptional({ example: 'uuid-patient-id' })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional({ example: 'pending', enum: ['pending', 'processing', 'completed'] })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
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
  limit?: number;
}
