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
exports.PharmacyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pharmacy_service_1 = require("./pharmacy.service");
const pharmacy_dto_1 = require("./dto/pharmacy.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let PharmacyController = class PharmacyController {
    constructor(pharmacyService) {
        this.pharmacyService = pharmacyService;
    }
    findAll(user, filters) {
        return this.pharmacyService.findAll(user.hospitalId, filters);
    }
    getLowStock(user) {
        return this.pharmacyService.getLowStockMedicines(user.hospitalId);
    }
    findOne(id) {
        return this.pharmacyService.findOne(id);
    }
    create(dto, user) {
        return this.pharmacyService.create(dto, user.hospitalId);
    }
    update(id, dto) {
        return this.pharmacyService.update(id, dto);
    }
    remove(id) {
        return this.pharmacyService.remove(id);
    }
    updateStock(id, dto) {
        return this.pharmacyService.updateStock(id, dto);
    }
};
exports.PharmacyController = PharmacyController;
__decorate([
    (0, common_1.Get)('medicines'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List medicines with filters' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pharmacy_dto_1.MedicineFilterDto]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('low-stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get low stock medicines alert' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "getLowStock", null);
__decorate([
    (0, common_1.Get)('medicines/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get medicine by id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('medicines'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Pharmacist'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a medicine' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pharmacy_dto_1.CreateMedicineDto, Object]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('medicines/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Pharmacist'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a medicine' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pharmacy_dto_1.UpdateMedicineDto]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('medicines/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Pharmacist'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a medicine' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('medicines/:id/stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Pharmacist'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update medicine stock' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pharmacy_dto_1.UpdateStockDto]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "updateStock", null);
exports.PharmacyController = PharmacyController = __decorate([
    (0, swagger_1.ApiTags)('Pharmacy'),
    (0, common_1.Controller)('pharmacy'),
    __metadata("design:paramtypes", [pharmacy_service_1.PharmacyService])
], PharmacyController);
//# sourceMappingURL=pharmacy.controller.js.map