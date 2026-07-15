import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Pharmacist' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Can manage pharmacy inventory' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: ['uuid-perm-1', 'uuid-perm-2'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissionIds?: string[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
