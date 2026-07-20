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
exports.LabReportFilterDto = exports.UpdateLabReportStatusDto = exports.CreateLabReportDto = exports.UpdateLabTestDto = exports.CreateLabTestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateLabTestDto {
}
exports.CreateLabTestDto = CreateLabTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete Blood Count' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Hematology' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Measures RBC, WBC, platelet count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLabTestDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2-4 hours' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "turnaroundTime", void 0);
class UpdateLabTestDto extends (0, swagger_2.PartialType)(CreateLabTestDto) {
}
exports.UpdateLabTestDto = UpdateLabTestDto;
class CreateLabReportDto {
}
exports.CreateLabReportDto = CreateLabReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-medical-record-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "medicalRecordId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-lab-test-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "labTestId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'WBC: 7000, RBC: 4.5M' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://storage.example.com/report.pdf' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'pending', enum: ['pending', 'processing', 'completed'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "status", void 0);
class UpdateLabReportStatusDto {
}
exports.UpdateLabReportStatusDto = UpdateLabReportStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'completed', enum: ['pending', 'processing', 'completed'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabReportStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'WBC: 7000, RBC: 4.5M, Hemoglobin: 13.5' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabReportStatusDto.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://storage.example.com/report.pdf' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabReportStatusDto.prototype, "fileUrl", void 0);
class LabReportFilterDto {
}
exports.LabReportFilterDto = LabReportFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-patient-id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LabReportFilterDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'pending', enum: ['pending', 'processing', 'completed'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LabReportFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LabReportFilterDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LabReportFilterDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LabReportFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LabReportFilterDto.prototype, "limit", void 0);
//# sourceMappingURL=lab.dto.js.map