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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto, StaffFilterDto } from './dto/staff.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get staff list with filters' })
  findAll(@CurrentUser() user: any, @Query() filters: StaffFilterDto) {
    return this.staffService.findAll(user.hospitalId, filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get staff member by id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a staff member' })
  create(@Body() dto: CreateStaffDto, @CurrentUser() user: any) {
    return this.staffService.create(dto, user.hospitalId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a staff member' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStaffDto,
  ) {
    return this.staffService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deactivate a staff member' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffService.remove(id);
  }

  @Post(':id/attendance')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark attendance for a staff member' })
  @ApiQuery({ name: 'date', type: String, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'checkIn', type: String, required: false, description: 'ISO datetime' })
  @ApiQuery({ name: 'checkOut', type: String, required: false, description: 'ISO datetime' })
  @ApiQuery({ name: 'status', type: String, required: false, description: 'present, absent, half_day, late, on_leave' })
  markAttendance(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('date') date: string,
    @Query('checkIn') checkIn?: string,
    @Query('checkOut') checkOut?: string,
    @Query('status') status?: string,
  ) {
    return this.staffService.markAttendance(id, date, checkIn, checkOut, status);
  }

  @Get(':id/attendance')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get attendance records for a staff member' })
  @ApiQuery({ name: 'startDate', type: String, description: 'YYYY-MM-DD' })
  @ApiQuery({ name: 'endDate', type: String, description: 'YYYY-MM-DD' })
  getAttendance(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.staffService.getAttendance(id, startDate, endDate);
  }

  @Post(':id/leaves')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply for leave' })
  applyLeave(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { type: string; startDate: string; endDate: string; reason?: string },
  ) {
    return this.staffService.applyLeave(id, body.type, body.startDate, body.endDate, body.reason);
  }

  @Get(':id/leaves')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get leave records for a staff member' })
  @ApiQuery({ name: 'status', type: String, required: false, description: 'pending, approved, rejected' })
  getLeaves(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('status') status?: string,
  ) {
    return this.staffService.getLeaves(id, status);
  }
}
