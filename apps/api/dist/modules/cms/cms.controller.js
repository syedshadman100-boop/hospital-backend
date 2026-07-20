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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cms_service_1 = require("./cms.service");
const cms_dto_1 = require("./dto/cms.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let CmsController = class CmsController {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    getPageBySlug(slug) {
        return this.cmsService.findOnePageBySlug(slug);
    }
    getBlogs(filters) {
        return this.cmsService.findAllBlogs(filters);
    }
    async getBlogBySlug(slug) {
        const blog = await this.cmsService.findOneBlogBySlug(slug);
        await this.cmsService.incrementBlogViewCount(slug);
        return blog;
    }
    getFaqs(filters) {
        return this.cmsService.findAllFaqs(filters);
    }
    getTestimonials() {
        return this.cmsService.findPublishedTestimonials();
    }
    getGallery(filters) {
        return this.cmsService.findGallery(filters);
    }
    createContactMessage(dto) {
        return this.cmsService.createContactMessage(dto);
    }
    getPagesAdmin(filters) {
        return this.cmsService.findAllPages(filters);
    }
    createPage(dto) {
        return this.cmsService.createPage(dto);
    }
    updatePage(id, dto) {
        return this.cmsService.updatePage(id, dto);
    }
    removePage(id) {
        return this.cmsService.removePage(id);
    }
    getBlogsAdmin(filters) {
        return this.cmsService.findAllBlogsAdmin(filters);
    }
    createBlog(dto) {
        return this.cmsService.createBlog(dto);
    }
    updateBlog(id, dto) {
        return this.cmsService.updateBlog(id, dto);
    }
    removeBlog(id) {
        return this.cmsService.removeBlog(id);
    }
    getFaqsAdmin(filters) {
        return this.cmsService.findAllFaqsAdmin(filters);
    }
    createFaq(dto) {
        return this.cmsService.createFaq(dto);
    }
    updateFaq(id, dto) {
        return this.cmsService.updateFaq(id, dto);
    }
    removeFaq(id) {
        return this.cmsService.removeFaq(id);
    }
    getTestimonialsAdmin(filters) {
        return this.cmsService.findAllTestimonials(filters);
    }
    createTestimonial(dto) {
        return this.cmsService.createTestimonial(dto);
    }
    updateTestimonial(id, dto) {
        return this.cmsService.updateTestimonial(id, dto);
    }
    removeTestimonial(id) {
        return this.cmsService.removeTestimonial(id);
    }
    getGalleryAdmin(filters) {
        return this.cmsService.findAllGalleryAdmin(filters);
    }
    createGallery(dto) {
        return this.cmsService.createGallery(dto);
    }
    updateGallery(id, dto) {
        return this.cmsService.updateGallery(id, dto);
    }
    removeGallery(id) {
        return this.cmsService.removeGallery(id);
    }
    getContactMessages(filters) {
        return this.cmsService.findAllContactMessages(filters);
    }
    markContactMessageAsRead(id) {
        return this.cmsService.markContactMessageAsRead(id);
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Get)('pages/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get page by slug (public)' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getPageBySlug", null);
__decorate([
    (0, common_1.Get)('blogs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published blogs (public)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CmsFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.Get)('blogs/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get blog by slug (public)' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getBlogBySlug", null);
__decorate([
    (0, common_1.Get)('faqs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active FAQs (public)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CmsFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getFaqs", null);
__decorate([
    (0, common_1.Get)('testimonials'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published testimonials (public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getTestimonials", null);
__decorate([
    (0, common_1.Get)('gallery'),
    (0, swagger_1.ApiOperation)({ summary: 'Get gallery items (public)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.GalleryFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getGallery", null);
__decorate([
    (0, common_1.Post)('contact'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit contact message (public)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CreateContactMessageDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createContactMessage", null);
__decorate([
    (0, common_1.Get)('admin/pages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all CMS pages (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CmsFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getPagesAdmin", null);
__decorate([
    (0, common_1.Post)('admin/pages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create CMS page (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CreateCmsPageDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createPage", null);
__decorate([
    (0, common_1.Put)('admin/pages/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update CMS page (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_dto_1.UpdateCmsPageDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updatePage", null);
__decorate([
    (0, common_1.Delete)('admin/pages/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete CMS page (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "removePage", null);
__decorate([
    (0, common_1.Get)('admin/blogs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all blogs including drafts (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CmsFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getBlogsAdmin", null);
__decorate([
    (0, common_1.Post)('admin/blogs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create blog (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CreateBlogDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Put)('admin/blogs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update blog (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)('admin/blogs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete blog (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "removeBlog", null);
__decorate([
    (0, common_1.Get)('admin/faqs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all FAQs including inactive (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CmsFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getFaqsAdmin", null);
__decorate([
    (0, common_1.Post)('admin/faqs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create FAQ (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CreateFaqDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createFaq", null);
__decorate([
    (0, common_1.Put)('admin/faqs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update FAQ (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_dto_1.UpdateFaqDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateFaq", null);
__decorate([
    (0, common_1.Delete)('admin/faqs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete FAQ (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "removeFaq", null);
__decorate([
    (0, common_1.Get)('admin/testimonials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all testimonials (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CmsFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getTestimonialsAdmin", null);
__decorate([
    (0, common_1.Post)('admin/testimonials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create testimonial (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CreateTestimonialDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createTestimonial", null);
__decorate([
    (0, common_1.Put)('admin/testimonials/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update testimonial (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_dto_1.UpdateTestimonialDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateTestimonial", null);
__decorate([
    (0, common_1.Delete)('admin/testimonials/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete testimonial (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "removeTestimonial", null);
__decorate([
    (0, common_1.Get)('admin/gallery'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all gallery items including inactive (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.GalleryFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getGalleryAdmin", null);
__decorate([
    (0, common_1.Post)('admin/gallery'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create gallery item (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CreateGalleryDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createGallery", null);
__decorate([
    (0, common_1.Put)('admin/gallery/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update gallery item (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cms_dto_1.UpdateGalleryDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateGallery", null);
__decorate([
    (0, common_1.Delete)('admin/gallery/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete gallery item (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "removeGallery", null);
__decorate([
    (0, common_1.Get)('admin/contact-messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List contact messages (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cms_dto_1.CmsFilterDto]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getContactMessages", null);
__decorate([
    (0, common_1.Put)('admin/contact-messages/:id/read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mark contact message as read (admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "markContactMessageAsRead", null);
exports.CmsController = CmsController = __decorate([
    (0, swagger_1.ApiTags)('CMS'),
    (0, common_1.Controller)('cms'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map