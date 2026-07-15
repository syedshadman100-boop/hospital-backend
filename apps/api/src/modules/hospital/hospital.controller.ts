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
import { HospitalService } from './hospital.service';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Hospitals')
@Controller('hospitals')
export class HospitalController {
  constructor(private hospitalService: HospitalService) {}

  @Get()
  @ApiOperation({ summary: 'Get all hospitals' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.hospitalService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      search,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hospital by id' })
  findOne(@Param('id') id: string) {
    return this.hospitalService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a hospital' })
  create(@Body() dto: CreateHospitalDto, @CurrentUser() user: any) {
    return this.hospitalService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hospital' })
  update(@Param('id') id: string, @Body() dto: UpdateHospitalDto) {
    return this.hospitalService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deactivate a hospital' })
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(id);
  }
}
