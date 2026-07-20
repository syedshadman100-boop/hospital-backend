import { CmsService } from './cms.service';
import { CreateCmsPageDto, UpdateCmsPageDto, CreateBlogDto, UpdateBlogDto, CreateFaqDto, UpdateFaqDto, CreateTestimonialDto, UpdateTestimonialDto, CreateGalleryDto, UpdateGalleryDto, CreateContactMessageDto, CmsFilterDto, GalleryFilterDto } from './dto/cms.dto';
export declare class CmsController {
    private cmsService;
    constructor(cmsService: CmsService);
    getPageBySlug(slug: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        content: string;
        metaTitle: string | null;
        metaDesc: string | null;
        isPublished: boolean;
    }>;
    getBlogs(filters: CmsFilterDto): Promise<{
        data: {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tags: string | null;
            slug: string;
            content: string;
            category: string | null;
            isPublished: boolean;
            excerpt: string | null;
            coverImage: string | null;
            author: string | null;
            publishedAt: Date | null;
            viewCount: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBlogBySlug(slug: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string | null;
        slug: string;
        content: string;
        category: string | null;
        isPublished: boolean;
        excerpt: string | null;
        coverImage: string | null;
        author: string | null;
        publishedAt: Date | null;
        viewCount: number;
    }>;
    getFaqs(filters: CmsFilterDto): Promise<{
        data: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            category: string | null;
            question: string;
            answer: string;
            sortOrder: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getTestimonials(): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        rating: number;
        isPublished: boolean;
        patientName: string;
        patientAvatar: string | null;
    }[]>;
    getGallery(filters: GalleryFilterDto): Promise<{
        data: {
            title: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            category: string | null;
            fileUrl: string;
            fileType: string;
            sortOrder: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createContactMessage(dto: CreateContactMessageDto): Promise<{
        email: string;
        phone: string | null;
        id: string;
        createdAt: Date;
        name: string;
        message: string;
        isRead: boolean;
        subject: string | null;
        repliedAt: Date | null;
    }>;
    getPagesAdmin(filters: CmsFilterDto): Promise<{
        data: {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            content: string;
            metaTitle: string | null;
            metaDesc: string | null;
            isPublished: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createPage(dto: CreateCmsPageDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        content: string;
        metaTitle: string | null;
        metaDesc: string | null;
        isPublished: boolean;
    }>;
    updatePage(id: string, dto: UpdateCmsPageDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        content: string;
        metaTitle: string | null;
        metaDesc: string | null;
        isPublished: boolean;
    }>;
    removePage(id: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        content: string;
        metaTitle: string | null;
        metaDesc: string | null;
        isPublished: boolean;
    }>;
    getBlogsAdmin(filters: CmsFilterDto): Promise<{
        data: {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tags: string | null;
            slug: string;
            content: string;
            category: string | null;
            isPublished: boolean;
            excerpt: string | null;
            coverImage: string | null;
            author: string | null;
            publishedAt: Date | null;
            viewCount: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createBlog(dto: CreateBlogDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string | null;
        slug: string;
        content: string;
        category: string | null;
        isPublished: boolean;
        excerpt: string | null;
        coverImage: string | null;
        author: string | null;
        publishedAt: Date | null;
        viewCount: number;
    }>;
    updateBlog(id: string, dto: UpdateBlogDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string | null;
        slug: string;
        content: string;
        category: string | null;
        isPublished: boolean;
        excerpt: string | null;
        coverImage: string | null;
        author: string | null;
        publishedAt: Date | null;
        viewCount: number;
    }>;
    removeBlog(id: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string | null;
        slug: string;
        content: string;
        category: string | null;
        isPublished: boolean;
        excerpt: string | null;
        coverImage: string | null;
        author: string | null;
        publishedAt: Date | null;
        viewCount: number;
    }>;
    getFaqsAdmin(filters: CmsFilterDto): Promise<{
        data: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            category: string | null;
            question: string;
            answer: string;
            sortOrder: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createFaq(dto: CreateFaqDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        question: string;
        answer: string;
        sortOrder: number;
    }>;
    updateFaq(id: string, dto: UpdateFaqDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        question: string;
        answer: string;
        sortOrder: number;
    }>;
    removeFaq(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        question: string;
        answer: string;
        sortOrder: number;
    }>;
    getTestimonialsAdmin(filters: CmsFilterDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            content: string;
            rating: number;
            isPublished: boolean;
            patientName: string;
            patientAvatar: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createTestimonial(dto: CreateTestimonialDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        rating: number;
        isPublished: boolean;
        patientName: string;
        patientAvatar: string | null;
    }>;
    updateTestimonial(id: string, dto: UpdateTestimonialDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        rating: number;
        isPublished: boolean;
        patientName: string;
        patientAvatar: string | null;
    }>;
    removeTestimonial(id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        rating: number;
        isPublished: boolean;
        patientName: string;
        patientAvatar: string | null;
    }>;
    getGalleryAdmin(filters: GalleryFilterDto): Promise<{
        data: {
            title: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            category: string | null;
            fileUrl: string;
            fileType: string;
            sortOrder: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createGallery(dto: CreateGalleryDto): Promise<{
        title: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        category: string | null;
        fileUrl: string;
        fileType: string;
        sortOrder: number;
    }>;
    updateGallery(id: string, dto: UpdateGalleryDto): Promise<{
        title: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        category: string | null;
        fileUrl: string;
        fileType: string;
        sortOrder: number;
    }>;
    removeGallery(id: string): Promise<{
        title: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        category: string | null;
        fileUrl: string;
        fileType: string;
        sortOrder: number;
    }>;
    getContactMessages(filters: CmsFilterDto): Promise<{
        data: {
            email: string;
            phone: string | null;
            id: string;
            createdAt: Date;
            name: string;
            message: string;
            isRead: boolean;
            subject: string | null;
            repliedAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    markContactMessageAsRead(id: string): Promise<{
        email: string;
        phone: string | null;
        id: string;
        createdAt: Date;
        name: string;
        message: string;
        isRead: boolean;
        subject: string | null;
        repliedAt: Date | null;
    }>;
}
