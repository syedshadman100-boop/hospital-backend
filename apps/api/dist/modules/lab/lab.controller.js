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
exports.LabController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lab_service_1 = require("./lab.service");
const lab_dto_1 = require("./dto/lab.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let LabController = class LabController {
    constructor(labService) {
        this.labService = labService;
    }
    findAllTests(user) {
        return this.labService.findAllTests(user.hospitalId);
    }
    findOneTest(id) {
        return this.labService.findOneTest(id);
    }
    createTest(dto, user) {
        return this.labService.createTest(dto, user.hospitalId);
    }
    updateTest(id, dto) {
        return this.labService.updateTest(id, dto);
    }
    removeTest(id) {
        return this.labService.removeTest(id);
    }
    createReport(dto, user) {
        return this.labService.createReport(dto, user.hospitalId);
    }
    findAllReports(user, filters) {
        return this.labService.findAllReports(user.hospitalId, filters);
    }
    updateReportStatus(id, dto) {
        return this.labService.updateReportStatus(id, dto);
    }
    getReportsByPatient(patientId) {
        return this.labService.getReportsByPatient(patientId);
    }
};
exports.LabController = LabController;
__decorate([
    (0, common_1.Get)('tests'),
    (0, swagger_1.ApiOperation)({ summary: 'List lab tests' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "findAllTests", null);
__decorate([
    (0, common_1.Get)('tests/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lab test details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "findOneTest", null);
__decorate([
    (0, common_1.Post)('tests'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a lab test' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lab_dto_1.CreateLabTestDto, Object]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "createTest", null);
__decorate([
    (0, common_1.Put)('tests/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lab test' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lab_dto_1.UpdateLabTestDto]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "updateTest", null);
__decorate([
    (0, common_1.Delete)('tests/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate a lab test' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "removeTest", null);
__decorate([
    (0, common_1.Post)('reports'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Lab Technician'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a lab report' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lab_dto_1.CreateLabReportDto, Object]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "createReport", null);
__decorate([
    (0, common_1.Get)('reports'),
    (0, swagger_1.ApiOperation)({ summary: 'List lab reports with filters' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lab_dto_1.LabReportFilterDto]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "findAllReports", null);
__decorate([
    (0, common_1.Put)('reports/:id/status'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Lab Technician'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lab report status' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lab_dto_1.UpdateLabReportStatusDto]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "updateReportStatus", null);
__decorate([
    (0, common_1.Get)('reports/patient/:patientId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Lab Technician'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lab reports for a patient' }),
    __param(0, (0, common_1.Param)('patientId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabController.prototype, "getReportsByPatient", null);
exports.LabController = LabController = __decorate([
    (0, swagger_1.ApiTags)('Laboratory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('lab'),
    __metadata("design:paramtypes", [lab_service_1.LabService])
], LabController);
//# sourceMappingURL=lab.controller.js.map