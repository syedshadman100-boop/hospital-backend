import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Cardiology' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Heart and cardiovascular care' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}
