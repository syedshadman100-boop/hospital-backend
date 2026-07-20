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
exports.DoctorFilterDto = exports.UpdateDoctorDto = exports.CreateDoctorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateDoctorDto {
}
exports.CreateDoctorDto = CreateDoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-department' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rajesh' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sharma' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rajesh.sharma@hospital.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+919876543210' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Male', enum: ['Male', 'Female', 'Other'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1985-06-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MBBS, MD Cardiology' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "qualification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 12 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDoctorDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cardiology' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "specialization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Experienced cardiologist with expertise in interventional cardiology' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDoctorDto.prototype, "consultationFee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'English,Hindi,Marathi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Best Cardiologist Award 2020' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "achievements", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Indian Medical Association, Cardiological Society of India' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "memberships", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'offline,online,video' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "consultationTypes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://meet.google.com/abc-defg-hij' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "videoConsultUrl", void 0);
class UpdateDoctorDto extends (0, swagger_2.PartialType)(CreateDoctorDto) {
}
exports.UpdateDoctorDto = UpdateDoctorDto;
class DoctorFilterDto {
}
exports.DoctorFilterDto = DoctorFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-hospital' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorFilterDto.prototype, "hospitalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-department' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorFilterDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DoctorFilterDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DoctorFilterDto.prototype, "isOnline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'cardio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], DoctorFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], DoctorFilterDto.prototype, "limit", void 0);
//# sourceMappingURL=doctor.dto.js.map