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

  @Get('public/:slug')
  @ApiOperation({ summary: 'Get hospital by slug (public, no auth)' })
  findBySlug(@Param('slug') slug: string) {
    return this.hospitalService.findBySlug(slug);
  }

  @Get('public/:slug/settings')
  @ApiOperation({ summary: 'Get hospital settings (public, no auth)' })
  getSettings(@Param('slug') slug: string) {
    return this.hospitalService.getSettings(slug);
  }

  @Get('public/domain/lookup/:domain')
  @ApiOperation({ summary: 'Look up hospital slug by domain (public, no auth)' })
  lookupByDomain(@Param('domain') domain: string) {
    return this.hospitalService.findSlugByDomain(domain);
  }

  @Get('public/domain/:domain')
  @ApiOperation({ summary: 'Get hospital by domain (public, no auth)' })
  findByDomain(@Param('domain') domain: string) {
    return this.hospitalService.findByDomain(domain);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all hospitals (auth required)' })
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
