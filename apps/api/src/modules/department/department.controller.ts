import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get departments (public)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @CurrentUser() user: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.departmentService.findAll(
      user?.hospitalId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
      search,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get department by id' })
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('Super Admin', 'Hospital Admin')
  @ApiOperation({ summary: 'Create a department' })
  create(@Body() dto: CreateDepartmentDto, @CurrentUser() user: any) {
    return this.departmentService.create(dto, user.hospitalId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('Super Admin', 'Hospital Admin')
  @ApiOperation({ summary: 'Update a department' })
  update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.departmentService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('Super Admin', 'Hospital Admin')
  @ApiOperation({ summary: 'Deactivate a department' })
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
