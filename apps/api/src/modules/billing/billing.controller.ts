import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import {
  CreateInvoiceDto,
  CreatePaymentDto,
  RefundPaymentDto,
  InvoiceFilterDto,
} from './dto/billing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Billing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get('invoices')
  @ApiOperation({ summary: 'List invoices with filters' })
  findAll(@CurrentUser() user: any, @Query() filters: InvoiceFilterDto) {
    return this.billingService.findAll(user.hospitalId, filters);
  }

  @Get('invoices/:id')
  @ApiOperation({ summary: 'Get invoice details' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.billingService.findOne(id);
  }

  @Post('invoices')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Cashier')
  @ApiOperation({ summary: 'Create a new invoice' })
  createInvoice(@Body() dto: CreateInvoiceDto, @CurrentUser() user: any) {
    return this.billingService.createInvoice(dto, user.hospitalId);
  }

  @Post('payments')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Cashier')
  @ApiOperation({ summary: 'Record a payment against an invoice' })
  createPayment(@Body() dto: CreatePaymentDto, @CurrentUser() user: any) {
    return this.billingService.createPayment(dto, user.hospitalId);
  }

  @Get('invoices/:id/summary')
  @ApiOperation({ summary: 'Get invoice summary with balance' })
  getInvoiceSummary(@Param('id', ParseUUIDPipe) id: string) {
    return this.billingService.getInvoiceSummary(id);
  }

  @Post('payments/:id/refund')
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Cashier')
  @ApiOperation({ summary: 'Refund a payment' })
  refundPayment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RefundPaymentDto,
    @CurrentUser() user: any,
  ) {
    return this.billingService.refundPayment(id, dto, user.hospitalId);
  }
}
