import { CmsService } from './cms.service';
import { CreateCmsPageDto, UpdateCmsPageDto, CreateBlogDto, UpdateBlogDto, CreateFaqDto, UpdateFaqDto, CreateTestimonialDto, UpdateTestimonialDto, CreateGalleryDto, UpdateGalleryDto, CreateContactMessageDto, CmsFilterDto, GalleryFilterDto } from './dto/cms.dto';
export declare class CmsController {
    private cmsService;
    constructor(cmsService: CmsService);
    getPageBySlug(slug: string): Promise<any>;
    getBlogs(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBlogBySlug(slug: string): Promise<any>;
    getFaqs(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getTestimonials(): Promise<any[]>;
    getGallery(filters: GalleryFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createContactMessage(dto: CreateContactMessageDto): Promise<any>;
    getPagesAdmin(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createPage(dto: CreateCmsPageDto): Promise<any>;
    updatePage(id: string, dto: UpdateCmsPageDto): Promise<any>;
    removePage(id: string): Promise<any>;
    getBlogsAdmin(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createBlog(dto: CreateBlogDto): Promise<any>;
    updateBlog(id: string, dto: UpdateBlogDto): Promise<any>;
    removeBlog(id: string): Promise<any>;
    getFaqsAdmin(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createFaq(dto: CreateFaqDto): Promise<any>;
    updateFaq(id: string, dto: UpdateFaqDto): Promise<any>;
    removeFaq(id: string): Promise<any>;
    getTestimonialsAdmin(filters: CmsFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createTestimonial(dto: CreateTestimonialDto): Promise<any>;
    updateTestimonial(id: string, dto: UpdateTestimonialDto): Promise<any>;
    removeTestimonial(id: string): Promise<any>;
    getGalleryAdmin(filters: GalleryFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createGallery(dto: CreateGalleryDto): Promise<any>;
    updateGallery(id: string, dto: UpdateGalleryDto): Promise<any>;
    removeGallery(id: string): Promise<any>;
    getContactMessages(filters: CmsFilterDto): Promise<{
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
