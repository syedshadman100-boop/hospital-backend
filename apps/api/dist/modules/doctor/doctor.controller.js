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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctor_service_1 = require("./doctor.service");
const doctor_dto_1 = require("./dto/doctor.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    findAll(user, filters) {
        return this.doctorService.findAll(user?.hospitalId, filters);
    }
    findOne(id) {
        return this.doctorService.findOne(id);
    }
    create(dto, user) {
        return this.doctorService.create(dto, user.hospitalId);
    }
    update(id, dto) {
        return this.doctorService.update(id, dto);
    }
    remove(id) {
        return this.doctorService.remove(id);
    }
    getSchedule(id) {
        return this.doctorService.getDoctorSchedule(id);
    }
    updateSchedule(id, dayOfWeek, startTime, endTime, slotDuration) {
        return this.doctorService.updateSchedule(id, parseInt(dayOfWeek, 10), startTime, endTime, parseInt(slotDuration, 10) || 30);
    }
    getAvailableSlots(id, date) {
        return this.doctorService.getAvailableSlots(id, date);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctors (public)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, doctor_dto_1.DoctorFilterDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctor profile by id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a doctor' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.CreateDoctorDto, Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a doctor' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate a doctor' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/schedule'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctor schedule' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getSchedule", null);
__decorate([
    (0, common_1.Put)(':id/schedule'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update doctor schedule for a specific day' }),
    (0, swagger_1.ApiQuery)({ name: 'dayOfWeek', type: Number, description: '0=Sunday to 6=Saturday' }),
    (0, swagger_1.ApiQuery)({ name: 'startTime', type: String, description: 'HH:MM format' }),
    (0, swagger_1.ApiQuery)({ name: 'endTime', type: String, description: 'HH:MM format' }),
    (0, swagger_1.ApiQuery)({ name: 'slotDuration', type: Number, description: 'Duration in minutes' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('dayOfWeek')),
    __param(2, (0, common_1.Query)('startTime')),
    __param(3, (0, common_1.Query)('endTime')),
    __param(4, (0, common_1.Query)('slotDuration')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "updateSchedule", null);
__decorate([
    (0, common_1.Get)(':id/slots'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available slots for a doctor on a given date' }),
    (0, swagger_1.ApiQuery)({ name: 'date', type: String, description: 'YYYY-MM-DD format' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getAvailableSlots", null);
exports.DoctorController = DoctorController = __decorate([
    (0, swagger_1.ApiTags)('Doctors'),
    (0, common_1.Controller)('doctors'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map