import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateDoctorDto {
  @ApiProperty({ example: 'uuid-of-department' })
  @IsString()
  departmentId: string;

  @ApiProperty({ example: 'Rajesh' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Sharma' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'rajesh.sharma@hospital.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: '1985-06-15' })
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'MBBS, MD Cardiology' })
  @IsOptional()
  @IsString()
  qualification?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  @Min(0)
  experience?: number;

  @ApiPropertyOptional({ example: 'Cardiology' })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiPropertyOptional({ example: 'Experienced cardiologist with expertise in interventional cardiology' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 1500 })
  @IsOptional()
  @IsNumber()
  consultationFee?: number;

  @ApiPropertyOptional({ example: 'English,Hindi,Marathi' })
  @IsOptional()
  @IsString()
  languages?: string;

  @ApiPropertyOptional({ example: 'Best Cardiologist Award 2020' })
  @IsOptional()
  @IsString()
  achievements?: string;

  @ApiPropertyOptional({ example: 'Indian Medical Association, Cardiological Society of India' })
  @IsOptional()
  @IsString()
  memberships?: string;

  @ApiPropertyOptional({ example: 'offline,online,video' })
  @IsOptional()
  @IsString()
  consultationTypes?: string;

  @ApiPropertyOptional({ example: 'https://meet.google.com/abc-defg-hij' })
  @IsOptional()
  @IsString()
  videoConsultUrl?: string;
}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}

export class DoctorFilterDto {
  @ApiPropertyOptional({ example: 'uuid-of-hospital' })
  @IsOptional()
  @IsString()
  hospitalId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-department' })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isOnline?: boolean;

  @ApiPropertyOptional({ example: 'cardio' })
  @IsOptional()
  @IsString()
  search?: string;

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
