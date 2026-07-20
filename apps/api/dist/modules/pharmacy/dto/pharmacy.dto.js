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
exports.UpdateStockDto = exports.MedicineFilterDto = exports.UpdateMedicineDto = exports.CreateMedicineDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateMedicineDto {
}
exports.CreateMedicineDto = CreateMedicineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Paracetamol 500mg' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Paracetamol' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "genericName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Analgesic' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cipla' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'strip', default: 'strip' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25.5 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMedicineDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMedicineDto.prototype, "stockQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMedicineDto.prototype, "minStock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'BAT-2024-001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMedicineDto.prototype, "batchNumber", void 0);
class UpdateMedicineDto extends (0, swagger_2.PartialType)(CreateMedicineDto) {
}
exports.UpdateMedicineDto = UpdateMedicineDto;
class MedicineFilterDto {
}
exports.MedicineFilterDto = MedicineFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Analgesic' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicineFilterDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'paracetamol' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicineFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MedicineFilterDto.prototype, "lowStock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], MedicineFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], MedicineFilterDto.prototype, "limit", void 0);
class UpdateStockDto {
}
exports.UpdateStockDto = UpdateStockDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateStockDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'add', enum: ['add', 'deduct'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStockDto.prototype, "operation", void 0);
//# sourceMappingURL=pharmacy.dto.js.map