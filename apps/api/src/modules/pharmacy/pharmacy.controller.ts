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
import { PharmacyService } from './pharmacy.service';
import {
  CreateMedicineDto,
  UpdateMedicineDto,
  MedicineFilterDto,
  UpdateStockDto,
} from './dto/pharmacy.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Pharmacy')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  @Get('medicines')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List medicines with filters' })
  findAll(@CurrentUser() user: any, @Query() filters: MedicineFilterDto) {
    return this.pharmacyService.findAll(user.hospitalId, filters);
  }

  @Get('low-stock')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get low stock medicines alert' })
  getLowStock(@CurrentUser() user: any) {
    return this.pharmacyService.getLowStockMedicines(user.hospitalId);
  }

  @Get('medicines/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get medicine by id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pharmacyService.findOne(id);
  }

  @Post('medicines')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Pharmacist')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a medicine' })
  create(@Body() dto: CreateMedicineDto, @CurrentUser() user: any) {
    return this.pharmacyService.create(dto, user.hospitalId);
  }

  @Put('medicines/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Pharmacist')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a medicine' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMedicineDto,
  ) {
    return this.pharmacyService.update(id, dto);
  }

  @Delete('medicines/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Pharmacist')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a medicine' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pharmacyService.remove(id);
  }

  @Put('medicines/:id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Pharmacist')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update medicine stock' })
  updateStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStockDto,
  ) {
    return this.pharmacyService.updateStock(id, dto);
  }
}
