import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsInt,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'user@hospital.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecureP@ss123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Rajesh' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Sharma' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'uuid-of-hospital' })
  @IsOptional()
  @IsString()
  hospitalId?: string;

  @ApiPropertyOptional({
    example: ['uuid-role-1', 'uuid-role-2'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleIds?: string[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserFilterDto {
  @ApiPropertyOptional({ example: 'uuid-of-hospital' })
  @IsOptional()
  @IsString()
  hospitalId?: string;

  @ApiPropertyOptional({ example: 'Hospital Admin' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ example: 'rajesh' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

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
