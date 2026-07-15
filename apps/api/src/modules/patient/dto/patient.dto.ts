import {
  IsString,
  IsOptional,
  IsEmail,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreatePatientDto {
  @ApiProperty({ example: 'Amit' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Patel' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: 'amit.patel@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: '1990-03-20' })
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'O+', enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: '123 MG Road, Andheri West' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Mumbai' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Maharashtra' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ example: '400058' })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ example: 'Indian' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional({ example: 'Sunita Patel' })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: '+919876543211' })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiPropertyOptional({ example: 'Spouse' })
  @IsOptional()
  @IsString()
  emergencyContactRelation?: string;

  @ApiPropertyOptional({ example: 'Star Health Insurance' })
  @IsOptional()
  @IsString()
  insuranceProvider?: string;

  @ApiPropertyOptional({ example: 'SH-12345678' })
  @IsOptional()
  @IsString()
  insurancePolicyNumber?: string;

  @ApiPropertyOptional({ example: 'Penicillin allergy' })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiPropertyOptional({ example: 'Diabetes Type 2, Hypertension' })
  @IsOptional()
  @IsString()
  medicalHistory?: string;
}

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}

export class PatientFilterDto {
  @ApiPropertyOptional({ example: 'amit' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'O+', enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

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
