import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Super Admin')
@ApiBearerAuth()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'List all roles' })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('permissions')
  @ApiOperation({ summary: 'List all available permissions' })
  getPermissions() {
    return this.roleService.getPermissions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by id with permissions' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a role' })
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a role' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, dto);
  }
}
