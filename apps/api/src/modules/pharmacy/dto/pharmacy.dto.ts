import {
  IsString,
  IsOptional,
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

export class CreateMedicineDto {
  @ApiProperty({ example: 'Paracetamol 500mg' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Paracetamol' })
  @IsOptional()
  @IsString()
  genericName?: string;

  @ApiPropertyOptional({ example: 'Analgesic' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Cipla' })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiPropertyOptional({ example: 'strip', default: 'strip' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ example: 25.5 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 500, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stockQuantity?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  minStock?: number;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({ example: 'BAT-2024-001' })
  @IsOptional()
  @IsString()
  batchNumber?: string;
}

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {}

export class MedicineFilterDto {
  @ApiPropertyOptional({ example: 'Analgesic' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'paracetamol' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  lowStock?: boolean;

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

export class UpdateStockDto {
  @ApiProperty({ example: 50 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 'add', enum: ['add', 'deduct'] })
  @IsString()
  operation: 'add' | 'deduct';
}
