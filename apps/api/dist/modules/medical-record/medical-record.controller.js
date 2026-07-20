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
exports.MedicalRecordController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medical_record_service_1 = require("./medical-record.service");
const medical_record_dto_1 = require("./dto/medical-record.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let MedicalRecordController = class MedicalRecordController {
    constructor(medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }
    findAll(user, filters) {
        return this.medicalRecordService.findAll(user.hospitalId, filters);
    }
    findOne(id) {
        return this.medicalRecordService.findOne(id);
    }
    create(dto, user) {
        return this.medicalRecordService.create(dto, user.hospitalId);
    }
    addPrescriptions(id, dto) {
        return this.medicalRecordService.addPrescriptions({ ...dto, medicalRecordId: id });
    }
    getPatientTimeline(patientId) {
        return this.medicalRecordService.getPatientTimeline(patientId);
    }
};
exports.MedicalRecordController = MedicalRecordController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List medical records' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, medical_record_dto_1.MedicalRecordFilterDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get medical record details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a medical record' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [medical_record_dto_1.CreateMedicalRecordDto, Object]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/prescriptions'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor'),
    (0, swagger_1.ApiOperation)({ summary: 'Add prescriptions to a medical record' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, medical_record_dto_1.CreatePrescriptionDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "addPrescriptions", null);
__decorate([
    (0, common_1.Get)('patient/:patientId/timeline'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist'),
    (0, swagger_1.ApiOperation)({ summary: 'Get patient medical timeline' }),
    __param(0, (0, common_1.Param)('patientId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "getPatientTimeline", null);
exports.MedicalRecordController = MedicalRecordController = __decorate([
    (0, swagger_1.ApiTags)('Medical Records'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('medical-records'),
    __metadata("design:paramtypes", [medical_record_service_1.MedicalRecordService])
], MedicalRecordController);
//# sourceMappingURL=medical-record.controller.js.map