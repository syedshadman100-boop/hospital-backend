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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MedicalRecordService } from './medical-record.service';
import {
  CreateMedicalRecordDto,
  CreatePrescriptionDto,
  MedicalRecordFilterDto,
} from './dto/medical-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Medical Records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical-records')
export class MedicalRecordController {
  constructor(private medicalRecordService: MedicalRecordService) {}

  @Get()
  @ApiOperation({ summary: 'List medical records' })
  findAll(@CurrentUser() user: any, @Query() filters: MedicalRecordFilterDto) {
    return this.medicalRecordService.findAll(user.hospitalId, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get medical record details' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicalRecordService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor')
  @ApiOperation({ summary: 'Create a medical record' })
  create(@Body() dto: CreateMedicalRecordDto, @CurrentUser() user: any) {
    return this.medicalRecordService.create(dto, user.hospitalId);
  }

  @Put(':id/prescriptions')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor')
  @ApiOperation({ summary: 'Add prescriptions to a medical record' })
  addPrescriptions(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreatePrescriptionDto,
  ) {
    return this.medicalRecordService.addPrescriptions({ ...dto, medicalRecordId: id });
  }

  @Get('patient/:patientId/timeline')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist')
  @ApiOperation({ summary: 'Get patient medical timeline' })
  getPatientTimeline(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.medicalRecordService.getPatientTimeline(patientId);
  }
}
