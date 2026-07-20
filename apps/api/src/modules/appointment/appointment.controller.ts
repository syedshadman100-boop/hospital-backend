import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentFilterDto,
  PublicCreateAppointmentDto,
} from './dto/appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post('public')
  @ApiOperation({ summary: 'Public booking from landing page (no auth required)' })
  publicCreate(@Body() dto: PublicCreateAppointmentDto) {
    return this.appointmentService.publicCreate(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get appointments with filters' })
  findAll(@CurrentUser() user: any, @Query() filters: AppointmentFilterDto) {
    return this.appointmentService.findAll(user.hospitalId, filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get appointment details' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an appointment' })
  create(@Body() dto: CreateAppointmentDto, @CurrentUser() user: any) {
    return this.appointmentService.create(dto, user.hospitalId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an appointment' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, dto);
  }

  @Get('doctor/:doctorId/today')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get today\'s appointments for a doctor' })
  getTodayAppointments(@Param('doctorId', ParseUUIDPipe) doctorId: string) {
    return this.appointmentService.getTodayAppointments(doctorId);
  }

  @Put(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel an appointment' })
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { reason: string },
  ) {
    return this.appointmentService.cancel(id, body.reason);
  }
}
