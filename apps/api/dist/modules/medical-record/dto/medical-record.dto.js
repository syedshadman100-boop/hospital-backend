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
exports.MedicalRecordFilterDto = exports.CreatePrescriptionDto = exports.PrescriptionItemDto = exports.CreateMedicalRecordDto = exports.VitalsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class VitalsDto {
}
exports.VitalsDto = VitalsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 98.6 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalsDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '120/80' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalsDto.prototype, "bp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 72 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalsDto.prototype, "heartRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 70 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalsDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 175 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalsDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 98 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VitalsDto.prototype, "oxygenSaturation", void 0);
class CreateMedicalRecordDto {
}
exports.CreateMedicalRecordDto = CreateMedicalRecordDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-appointment-id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Patient ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Viral fever with mild cough' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Fever, cough, body ache' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "symptoms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Prescribed antibiotics for 5 days' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: VitalsDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => VitalsDto),
    __metadata("design:type", VitalsDto)
], CreateMedicalRecordDto.prototype, "vitals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-07-28' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicalRecordDto.prototype, "followUpDate", void 0);
class PrescriptionItemDto {
}
exports.PrescriptionItemDto = PrescriptionItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Amoxicillin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "medicineName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '500mg' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "dosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Three times a day' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5 days' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Take with plenty of water' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrescriptionItemDto.prototype, "isBeforeFood", void 0);
class CreatePrescriptionDto {
}
exports.CreatePrescriptionDto = CreatePrescriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-medical-record-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "medicalRecordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PrescriptionItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrescriptionItemDto),
    __metadata("design:type", Array)
], CreatePrescriptionDto.prototype, "prescriptions", void 0);
class MedicalRecordFilterDto {
}
exports.MedicalRecordFilterDto = MedicalRecordFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-patient-id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalRecordFilterDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], MedicalRecordFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], MedicalRecordFilterDto.prototype, "limit", void 0);
//# sourceMappingURL=medical-record.dto.js.map