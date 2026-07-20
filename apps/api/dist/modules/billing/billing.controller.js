"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const billing_service_1 = require("./billing.service");
const billing_dto_1 = require("./dto/billing.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let BillingController = class BillingController {
    constructor(billingService) {
        this.billingService = billingService;
    }
    findAll(user, filters) {
        return this.billingService.findAll(user.hospitalId, filters);
    }
    findOne(id) {
        return this.billingService.findOne(id);
    }
    createInvoice(dto, user) {
        return this.billingService.createInvoice(dto, user.hospitalId);
    }
    createPayment(dto, user) {
        return this.billingService.createPayment(dto, user.hospitalId);
    }
    getInvoiceSummary(id) {
        return this.billingService.getInvoiceSummary(id);
    }
    refundPayment(id, dto, user) {
        return this.billingService.refundPayment(id, dto, user.hospitalId);
    }
};
exports.BillingController = BillingController;
__decorate([
    (0, common_1.Get)('invoices'),
    (0, swagger_1.ApiOperation)({ summary: 'List invoices with filters' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, billing_dto_1.InvoiceFilterDto]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('invoices/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('invoices'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Cashier'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new invoice' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billing_dto_1.CreateInvoiceDto, Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Post)('payments'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Cashier'),
    (0, swagger_1.ApiOperation)({ summary: 'Record a payment against an invoice' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billing_dto_1.CreatePaymentDto, Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('invoices/:id/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice summary with balance' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "getInvoiceSummary", null);
__decorate([
    (0, common_1.Post)('payments/:id/refund'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Cashier'),
    (0, swagger_1.ApiOperation)({ summary: 'Refund a payment' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, billing_dto_1.RefundPaymentDto, Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "refundPayment", null);
exports.BillingController = BillingController = __decorate([
    (0, swagger_1.ApiTags)('Billing'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('billing'),
    __metadata("design:paramtypes", [billing_service_1.BillingService])
], BillingController);
//# sourceMappingURL=billing.controller.js.map