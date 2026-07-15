import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateCmsPageDto,
  UpdateCmsPageDto,
  CreateBlogDto,
  UpdateBlogDto,
  CreateFaqDto,
  UpdateFaqDto,
  CreateTestimonialDto,
  UpdateTestimonialDto,
  CreateGalleryDto,
  UpdateGalleryDto,
  CreateContactMessageDto,
  CmsFilterDto,
  GalleryFilterDto,
} from './dto/cms.dto';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  // ─── CMS Pages ──────────────────────────────────────────

  async findAllPages(filters: CmsFilterDto) {
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

  async findOnePageBySlug(slug: string) {
    const page = await this.prisma.cmsPage.findFirst({
      where: { slug, isPublished: true },
    });
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  async findOnePage(id: string) {
    const page = await this.prisma.cmsPage.findUnique({ where: { id } });
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  async createPage(dto: CreateCmsPageDto) {
    return this.prisma.cmsPage.create({ data: dto });
  }

  async updatePage(id: string, dto: UpdateCmsPageDto) {
    await this.findOnePage(id);
    return this.prisma.cmsPage.update({ where: { id }, data: dto });
  }

  async removePage(id: string) {
    await this.findOnePage(id);
    return this.prisma.cmsPage.delete({ where: { id } });
  }

  // ─── Blog ───────────────────────────────────────────────

  async findAllBlogs(filters: CmsFilterDto) {
    const { page = 1, limit = 10, category, search } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
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

  async findAllBlogsAdmin(filters: CmsFilterDto) {
    const { page = 1, limit = 10, category, search } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
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

  async findOneBlogBySlug(slug: string) {
    const blog = await this.prisma.blog.findFirst({
      where: { slug, isPublished: true },
    });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async findOneBlog(id: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async createBlog(dto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        ...dto,
        publishedAt: dto.isPublished ? new Date() : null,
      },
    });
  }

  async updateBlog(id: string, dto: UpdateBlogDto) {
    await this.findOneBlog(id);
    return this.prisma.blog.update({ where: { id }, data: dto });
  }

  async removeBlog(id: string) {
    await this.findOneBlog(id);
    return this.prisma.blog.delete({ where: { id } });
  }

  async incrementBlogViewCount(slug: string) {
    const blog = await this.prisma.blog.findFirst({
      where: { slug, isPublished: true },
    });
    if (!blog) throw new NotFoundException('Blog not found');

    return this.prisma.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } },
    });
  }

  // ─── FAQ ────────────────────────────────────────────────

  async findAllFaqs(filters: CmsFilterDto) {
    const { page = 1, limit = 10, category } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
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

  async findAllFaqsAdmin(filters: CmsFilterDto) {
    const { page = 1, limit = 10, category } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
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

  async findOneFaq(id: string) {
    const faq = await this.prisma.faq.findUnique({ where: { id } });
    if (!faq) throw new NotFoundException('FAQ not found');
    return faq;
  }

  async createFaq(dto: CreateFaqDto) {
    return this.prisma.faq.create({ data: dto });
  }

  async updateFaq(id: string, dto: UpdateFaqDto) {
    await this.findOneFaq(id);
    return this.prisma.faq.update({ where: { id }, data: dto });
  }

  async removeFaq(id: string) {
    await this.findOneFaq(id);
    return this.prisma.faq.delete({ where: { id } });
  }

  // ─── Testimonial ────────────────────────────────────────

  async findPublishedTestimonials() {
    return this.prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllTestimonials(filters: CmsFilterDto) {
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

  async findOneTestimonial(id: string) {
    const t = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Testimonial not found');
    return t;
  }

  async createTestimonial(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({ data: dto });
  }

  async updateTestimonial(id: string, dto: UpdateTestimonialDto) {
    await this.findOneTestimonial(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async removeTestimonial(id: string) {
    await this.findOneTestimonial(id);
    return this.prisma.testimonial.delete({ where: { id } });
  }

  // ─── Gallery ────────────────────────────────────────────

  async findGallery(filters: GalleryFilterDto) {
    const { fileType, category, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
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

  async findAllGalleryAdmin(filters: GalleryFilterDto) {
    const { fileType, category, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
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

  async findOneGallery(id: string) {
    const item = await this.prisma.gallery.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Gallery item not found');
    return item;
  }

  async createGallery(dto: CreateGalleryDto) {
    return this.prisma.gallery.create({ data: dto });
  }

  async updateGallery(id: string, dto: UpdateGalleryDto) {
    await this.findOneGallery(id);
    return this.prisma.gallery.update({ where: { id }, data: dto });
  }

  async removeGallery(id: string) {
    await this.findOneGallery(id);
    return this.prisma.gallery.delete({ where: { id } });
  }

  // ─── Contact Message ────────────────────────────────────

  async createContactMessage(dto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({ data: dto });
  }

  async findAllContactMessages(filters: CmsFilterDto) {
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

  async markContactMessageAsRead(id: string) {
    const msg = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!msg) throw new NotFoundException('Contact message not found');

    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
