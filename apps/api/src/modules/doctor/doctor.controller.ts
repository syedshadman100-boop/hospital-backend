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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto, DoctorFilterDto } from './dto/doctor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Get()
  @ApiOperation({ summary: 'Get doctors (public)' })
  findAll(@CurrentUser() user: any, @Query() filters: DoctorFilterDto) {
    return this.doctorService.findAll(user?.hospitalId, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor profile by id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.doctorService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a doctor' })
  create(@Body() dto: CreateDoctorDto, @CurrentUser() user: any) {
    return this.doctorService.create(dto, user.hospitalId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a doctor' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deactivate a doctor' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.doctorService.remove(id);
  }

  @Get(':id/schedule')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get doctor schedule' })
  getSchedule(@Param('id', ParseUUIDPipe) id: string) {
    return this.doctorService.getDoctorSchedule(id);
  }

  @Put(':id/schedule')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update doctor schedule for a specific day' })
  @ApiQuery({ name: 'dayOfWeek', type: Number, description: '0=Sunday to 6=Saturday' })
  @ApiQuery({ name: 'startTime', type: String, description: 'HH:MM format' })
  @ApiQuery({ name: 'endTime', type: String, description: 'HH:MM format' })
  @ApiQuery({ name: 'slotDuration', type: Number, description: 'Duration in minutes' })
  updateSchedule(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('dayOfWeek') dayOfWeek: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('slotDuration') slotDuration: string,
  ) {
    return this.doctorService.updateSchedule(
      id,
      parseInt(dayOfWeek, 10),
      startTime,
      endTime,
      parseInt(slotDuration, 10) || 30,
    );
  }

  @Get(':id/slots')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get available slots for a doctor on a given date' })
  @ApiQuery({ name: 'date', type: String, description: 'YYYY-MM-DD format' })
  getAvailableSlots(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('date') date: string,
  ) {
    return this.doctorService.getAvailableSlots(id, date);
  }
}
