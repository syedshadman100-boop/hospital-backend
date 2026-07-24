import { PrismaService } from '../../prisma/prisma.service';
import { CreateCmsPageDto, UpdateCmsPageDto, CreateBlogDto, UpdateBlogDto, CreateFaqDto, UpdateFaqDto, CreateTestimonialDto, UpdateTestimonialDto, CreateGalleryDto, UpdateGalleryDto, CreateContactMessageDto, CmsFilterDto, GalleryFilterDto } from './dto/cms.dto';
export declare class CmsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPages(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOnePageBySlug(slug: string): Promise<any>;
    findOnePage(id: string): Promise<any>;
    createPage(dto: CreateCmsPageDto): Promise<any>;
    updatePage(id: string, dto: UpdateCmsPageDto): Promise<any>;
    removePage(id: string): Promise<any>;
    findAllBlogs(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findAllBlogsAdmin(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneBlogBySlug(slug: string): Promise<any>;
    findOneBlog(id: string): Promise<any>;
    createBlog(dto: CreateBlogDto): Promise<any>;
    updateBlog(id: string, dto: UpdateBlogDto): Promise<any>;
    removeBlog(id: string): Promise<any>;
    incrementBlogViewCount(slug: string): Promise<any>;
    findAllFaqs(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findAllFaqsAdmin(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneFaq(id: string): Promise<any>;
    createFaq(dto: CreateFaqDto): Promise<any>;
    updateFaq(id: string, dto: UpdateFaqDto): Promise<any>;
    removeFaq(id: string): Promise<any>;
    findPublishedTestimonials(): Promise<any[]>;
    findAllTestimonials(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneTestimonial(id: string): Promise<any>;
    createTestimonial(dto: CreateTestimonialDto): Promise<any>;
    updateTestimonial(id: string, dto: UpdateTestimonialDto): Promise<any>;
    removeTestimonial(id: string): Promise<any>;
    findGallery(filters: GalleryFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findAllGalleryAdmin(filters: GalleryFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOneGallery(id: string): Promise<any>;
    createGallery(dto: CreateGalleryDto): Promise<any>;
    updateGallery(id: string, dto: UpdateGalleryDto): Promise<any>;
    removeGallery(id: string): Promise<any>;
    createContactMessage(dto: CreateContactMessageDto): Promise<any>;
    findAllContactMessages(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    markContactMessageAsRead(id: string): Promise<any>;
}
