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
exports.GalleryFilterDto = exports.CmsFilterDto = exports.CreateContactMessageDto = exports.UpdateGalleryDto = exports.CreateGalleryDto = exports.UpdateTestimonialDto = exports.CreateTestimonialDto = exports.UpdateFaqDto = exports.CreateFaqDto = exports.UpdateBlogDto = exports.CreateBlogDto = exports.UpdateCmsPageDto = exports.CreateCmsPageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateCmsPageDto {
}
exports.CreateCmsPageDto = CreateCmsPageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'about-us' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'About Us' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<p>We are a leading hospital...</p>' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'About Us - Hospital Name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "metaTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Learn more about our hospital' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCmsPageDto.prototype, "metaDesc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCmsPageDto.prototype, "isPublished", void 0);
class UpdateCmsPageDto extends (0, swagger_2.PartialType)(CreateCmsPageDto) {
}
exports.UpdateCmsPageDto = UpdateCmsPageDto;
class CreateBlogDto {
}
exports.CreateBlogDto = CreateBlogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tips for Better Heart Health' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'tips-for-better-heart-health' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<p>Maintaining heart health is essential...</p>' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Simple tips to keep your heart healthy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "excerpt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/image.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "coverImage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dr. Sharma' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'heart,health,cardiology' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Health Tips' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBlogDto.prototype, "isPublished", void 0);
class UpdateBlogDto extends (0, swagger_2.PartialType)(CreateBlogDto) {
}
exports.UpdateBlogDto = UpdateBlogDto;
class CreateFaqDto {
}
exports.CreateFaqDto = CreateFaqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'What are the visiting hours?' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFaqDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Visiting hours are 10 AM to 8 PM.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFaqDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'General' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFaqDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFaqDto.prototype, "sortOrder", void 0);
class UpdateFaqDto extends (0, swagger_2.PartialType)(CreateFaqDto) {
}
exports.UpdateFaqDto = UpdateFaqDto;
class CreateTestimonialDto {
}
exports.CreateTestimonialDto = CreateTestimonialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Priya Patel' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "patientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateTestimonialDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Excellent care and treatment.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTestimonialDto.prototype, "isPublished", void 0);
class UpdateTestimonialDto extends (0, swagger_2.PartialType)(CreateTestimonialDto) {
}
exports.UpdateTestimonialDto = UpdateTestimonialDto;
class CreateGalleryDto {
}
exports.CreateGalleryDto = CreateGalleryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Hospital Lobby' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/image.jpg' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image', enum: ['image', 'video'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Infrastructure' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGalleryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateGalleryDto.prototype, "sortOrder", void 0);
class UpdateGalleryDto extends (0, swagger_2.PartialType)(CreateGalleryDto) {
}
exports.UpdateGalleryDto = UpdateGalleryDto;
class CreateContactMessageDto {
}
exports.CreateContactMessageDto = CreateContactMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContactMessageDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContactMessageDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+919876543210' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContactMessageDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Appointment Inquiry' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContactMessageDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'I would like to book an appointment.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContactMessageDto.prototype, "message", void 0);
class CmsFilterDto {
}
exports.CmsFilterDto = CmsFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CmsFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CmsFilterDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Health Tips' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CmsFilterDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'search term' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CmsFilterDto.prototype, "search", void 0);
class GalleryFilterDto {
}
exports.GalleryFilterDto = GalleryFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'image', enum: ['image', 'video'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GalleryFilterDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Infrastructure' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GalleryFilterDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GalleryFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], GalleryFilterDto.prototype, "limit", void 0);
//# sourceMappingURL=cms.dto.js.map