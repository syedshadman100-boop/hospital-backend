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
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CmsService = class CmsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPages(filters) {
        const { page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.cmsPage.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.cmsPage.count(),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOnePageBySlug(slug) {
        const page = await this.prisma.cmsPage.findFirst({
            where: { slug, isPublished: true },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return page;
    }
    async findOnePage(id) {
        const page = await this.prisma.cmsPage.findUnique({ where: { id } });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return page;
    }
    async createPage(dto) {
        return this.prisma.cmsPage.create({ data: dto });
    }
    async updatePage(id, dto) {
        await this.findOnePage(id);
        return this.prisma.cmsPage.update({ where: { id }, data: dto });
    }
    async removePage(id) {
        await this.findOnePage(id);
        return this.prisma.cmsPage.delete({ where: { id } });
    }
    async findAllBlogs(filters) {
        const { page = 1, limit = 10, category, search } = filters;
        const skip = (page - 1) * limit;
        const where = {
            isPublished: true,
            ...(category && { category }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { content: { contains: search } },
                    { tags: { contains: search } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.blog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.blog.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findAllBlogsAdmin(filters) {
        const { page = 1, limit = 10, category, search } = filters;
        const skip = (page - 1) * limit;
        const where = {
            ...(category && { category }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { content: { contains: search } },
                    { tags: { contains: search } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.blog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.blog.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOneBlogBySlug(slug) {
        const blog = await this.prisma.blog.findFirst({
            where: { slug, isPublished: true },
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async findOneBlog(id) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async createBlog(dto) {
        return this.prisma.blog.create({
            data: {
                ...dto,
                publishedAt: dto.isPublished ? new Date() : null,
            },
        });
    }
    async updateBlog(id, dto) {
        await this.findOneBlog(id);
        return this.prisma.blog.update({ where: { id }, data: dto });
    }
    async removeBlog(id) {
        await this.findOneBlog(id);
        return this.prisma.blog.delete({ where: { id } });
    }
    async incrementBlogViewCount(slug) {
        const blog = await this.prisma.blog.findFirst({
            where: { slug, isPublished: true },
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return this.prisma.blog.update({
            where: { id: blog.id },
            data: { viewCount: { increment: 1 } },
        });
    }
    async findAllFaqs(filters) {
        const { page = 1, limit = 10, category } = filters;
        const skip = (page - 1) * limit;
        const where = {
            isActive: true,
            ...(category && { category }),
        };
        const [data, total] = await Promise.all([
            this.prisma.faq.findMany({
                where,
                skip,
                take: limit,
                orderBy: { sortOrder: 'asc' },
            }),
            this.prisma.faq.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findAllFaqsAdmin(filters) {
        const { page = 1, limit = 10, category } = filters;
        const skip = (page - 1) * limit;
        const where = {
            ...(category && { category }),
        };
        const [data, total] = await Promise.all([
            this.prisma.faq.findMany({
                where,
                skip,
                take: limit,
                orderBy: { sortOrder: 'asc' },
            }),
            this.prisma.faq.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOneFaq(id) {
        const faq = await this.prisma.faq.findUnique({ where: { id } });
        if (!faq)
            throw new common_1.NotFoundException('FAQ not found');
        return faq;
    }
    async createFaq(dto) {
        return this.prisma.faq.create({ data: dto });
    }
    async updateFaq(id, dto) {
        await this.findOneFaq(id);
        return this.prisma.faq.update({ where: { id }, data: dto });
    }
    async removeFaq(id) {
        await this.findOneFaq(id);
        return this.prisma.faq.delete({ where: { id } });
    }
    async findPublishedTestimonials() {
        return this.prisma.testimonial.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllTestimonials(filters) {
        const { page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.testimonial.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.testimonial.count(),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOneTestimonial(id) {
        const t = await this.prisma.testimonial.findUnique({ where: { id } });
        if (!t)
            throw new common_1.NotFoundException('Testimonial not found');
        return t;
    }
    async createTestimonial(dto) {
        return this.prisma.testimonial.create({ data: dto });
    }
    async updateTestimonial(id, dto) {
        await this.findOneTestimonial(id);
        return this.prisma.testimonial.update({ where: { id }, data: dto });
    }
    async removeTestimonial(id) {
        await this.findOneTestimonial(id);
        return this.prisma.testimonial.delete({ where: { id } });
    }
    async findGallery(filters) {
        const { fileType, category, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {
            isActive: true,
            ...(fileType && { fileType }),
            ...(category && { category }),
        };
        const [data, total] = await Promise.all([
            this.prisma.gallery.findMany({
                where,
                skip,
                take: limit,
                orderBy: { sortOrder: 'asc' },
            }),
            this.prisma.gallery.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findAllGalleryAdmin(filters) {
        const { fileType, category, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {
            ...(fileType && { fileType }),
            ...(category && { category }),
        };
        const [data, total] = await Promise.all([
            this.prisma.gallery.findMany({
                where,
                skip,
                take: limit,
                orderBy: { sortOrder: 'asc' },
            }),
            this.prisma.gallery.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOneGallery(id) {
        const item = await this.prisma.gallery.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Gallery item not found');
        return item;
    }
    async createGallery(dto) {
        return this.prisma.gallery.create({ data: dto });
    }
    async updateGallery(id, dto) {
        await this.findOneGallery(id);
        return this.prisma.gallery.update({ where: { id }, data: dto });
    }
    async removeGallery(id) {
        await this.findOneGallery(id);
        return this.prisma.gallery.delete({ where: { id } });
    }
    async createContactMessage(dto) {
        return this.prisma.contactMessage.create({ data: dto });
    }
    async findAllContactMessages(filters) {
        const { page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.contactMessage.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.contactMessage.count(),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async markContactMessageAsRead(id) {
        const msg = await this.prisma.contactMessage.findUnique({ where: { id } });
        if (!msg)
            throw new common_1.NotFoundException('Contact message not found');
        return this.prisma.contactMessage.update({
            where: { id },
            data: { isRead: true },
        });
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CmsService);
//# sourceMappingURL=cms.service.js.map