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
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto, PatientFilterDto } from './dto/patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Patients')
@Controller('patients')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get()
  @ApiOperation({ summary: 'Get patients for current hospital' })
  findAll(
    @CurrentUser() user: any,
    @Query() filters: PatientFilterDto,
  ) {
    return this.patientService.findAll(user.hospitalId, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by id with related data' })
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Receptionist')
  @ApiOperation({ summary: 'Create a patient' })
  create(@Body() dto: CreatePatientDto, @CurrentUser() user: any) {
    return this.patientService.create(dto, user.hospitalId);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Receptionist')
  @ApiOperation({ summary: 'Update a patient' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Receptionist')
  @ApiOperation({ summary: 'Deactivate a patient' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientService.remove(id);
  }

  @Get(':id/history')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist')
  @ApiOperation({ summary: 'Get patient history timeline' })
  getHistory(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientService.getPatientHistory(id);
  }
}
