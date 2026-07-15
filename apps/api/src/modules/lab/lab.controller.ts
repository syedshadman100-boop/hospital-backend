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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LabService } from './lab.service';
import {
  CreateLabTestDto,
  UpdateLabTestDto,
  CreateLabReportDto,
  UpdateLabReportStatusDto,
  LabReportFilterDto,
} from './dto/lab.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Laboratory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('lab')
export class LabController {
  constructor(private labService: LabService) {}

  @Get('tests')
  @ApiOperation({ summary: 'List lab tests' })
  findAllTests(@CurrentUser() user: any) {
    return this.labService.findAllTests(user.hospitalId);
  }

  @Get('tests/:id')
  @ApiOperation({ summary: 'Get lab test details' })
  findOneTest(@Param('id', ParseUUIDPipe) id: string) {
    return this.labService.findOneTest(id);
  }

  @Post('tests')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiOperation({ summary: 'Create a lab test' })
  createTest(@Body() dto: CreateLabTestDto, @CurrentUser() user: any) {
    return this.labService.createTest(dto, user.hospitalId);
  }

  @Put('tests/:id')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiOperation({ summary: 'Update a lab test' })
  updateTest(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLabTestDto,
  ) {
    return this.labService.updateTest(id, dto);
  }

  @Delete('tests/:id')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiOperation({ summary: 'Deactivate a lab test' })
  removeTest(@Param('id', ParseUUIDPipe) id: string) {
    return this.labService.removeTest(id);
  }

  @Post('reports')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Lab Technician')
  @ApiOperation({ summary: 'Create a lab report' })
  createReport(@Body() dto: CreateLabReportDto, @CurrentUser() user: any) {
    return this.labService.createReport(dto, user.hospitalId);
  }

  @Get('reports')
  @ApiOperation({ summary: 'List lab reports with filters' })
  findAllReports(@CurrentUser() user: any, @Query() filters: LabReportFilterDto) {
    return this.labService.findAllReports(user.hospitalId, filters);
  }

  @Put('reports/:id/status')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Lab Technician')
  @ApiOperation({ summary: 'Update lab report status' })
  updateReportStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLabReportStatusDto,
  ) {
    return this.labService.updateReportStatus(id, dto);
  }

  @Get('reports/patient/:patientId')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Lab Technician')
  @ApiOperation({ summary: 'Get all lab reports for a patient' })
  getReportsByPatient(@Param('patientId', ParseUUIDPipe) patientId: string) {
    return this.labService.getReportsByPatient(patientId);
  }
}
