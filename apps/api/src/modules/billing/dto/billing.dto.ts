import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

class InvoiceItemDto {
  @ApiProperty({ example: 'Consultation Fee' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 'uuid-patient-id' })
  @IsString()
  patientId: string;

  @ApiPropertyOptional({ example: 'uuid-appointment-id' })
  @IsOptional()
  @IsString()
  appointmentId?: string;

  @ApiProperty({ type: [InvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiPropertyOptional({ example: 18 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  taxRate?: number;

  @ApiPropertyOptional({ example: 'Follow-up charges' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-invoice-id' })
  @IsString()
  invoiceId: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 'cash', enum: ['cash', 'card', 'upi', 'online', 'insurance'] })
  @IsString()
  @IsEnum(['cash', 'card', 'upi', 'online', 'insurance'])
  paymentMethod: string;

  @ApiPropertyOptional({ example: 'TXN-123456' })
  @IsOptional()
  @IsString()
  transactionId?: string;
}

export class RefundPaymentDto {
  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 'Patient requested cancellation' })
  @IsString()
  reason: string;
}

export class InvoiceFilterDto {
  @ApiPropertyOptional({ example: 'uuid-patient-id' })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional({ example: 'pending', enum: ['pending', 'partial', 'paid', 'cancelled', 'refunded'] })
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
