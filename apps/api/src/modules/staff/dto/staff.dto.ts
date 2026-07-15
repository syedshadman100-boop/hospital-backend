import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsInt,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateStaffDto {
  @ApiProperty({ example: 'Rahul' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Verma' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: 'rahul.verma@hospital.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: '1995-03-20' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'Radiology' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ example: 'Technician' })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  joinDate?: string;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiPropertyOptional({ example: 'morning', enum: ['morning', 'afternoon', 'night'] })
  @IsOptional()
  @IsString()
  shift?: string;
}

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}

export class StaffFilterDto {
  @ApiPropertyOptional({ example: 'Radiology' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ example: 'morning', enum: ['morning', 'afternoon', 'night'] })
  @IsOptional()
  @IsString()
  shift?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'rahul' })
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
