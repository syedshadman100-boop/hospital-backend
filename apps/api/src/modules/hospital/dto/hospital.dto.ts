import { IsString, IsOptional, IsEmail, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CreateHospitalDto {
  @ApiProperty({ example: 'City Hospital' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'city-hospital' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'contact@cityhospital.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '123 Medical Lane' })
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

  @ApiPropertyOptional({ example: 'India' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: '400001' })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ example: 'A leading multi-specialty hospital' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 19.076 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 72.8777 })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {}
