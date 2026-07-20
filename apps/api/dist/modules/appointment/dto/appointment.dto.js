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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicCreateAppointmentDto = exports.AppointmentFilterDto = exports.UpdateAppointmentDto = exports.CreateAppointmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateAppointmentDto {
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-patient' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-doctor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-07-20' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:30' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'offline', enum: ['offline', 'online', 'emergency'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "consultationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Persistent headache for 3 days' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "reason", void 0);
class UpdateAppointmentDto {
}
exports.UpdateAppointmentDto = UpdateAppointmentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'confirmed', enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Patient requested cancellation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "cancelReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Follow-up in 2 weeks' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "notes", void 0);
class AppointmentFilterDto {
}
exports.AppointmentFilterDto = AppointmentFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-doctor' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentFilterDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-patient' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentFilterDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'scheduled', enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'offline', enum: ['offline', 'online', 'emergency'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentFilterDto.prototype, "consultationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentFilterDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentFilterDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppointmentFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], AppointmentFilterDto.prototype, "limit", void 0);
class PublicCreateAppointmentDto {
}
exports.PublicCreateAppointmentDto = PublicCreateAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-doctor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-07-20' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '02:00 PM' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "timeSlot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Syed' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'syed@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], PublicCreateAppointmentDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'male', enum: ['male', 'female', 'other'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Chest pain since 2 days' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicCreateAppointmentDto.prototype, "reason", void 0);
//# sourceMappingURL=appointment.dto.js.map