import { PrismaService } from '../../prisma/prisma.service';
import { CreateCmsPageDto, UpdateCmsPageDto, CreateBlogDto, UpdateBlogDto, CreateFaqDto, UpdateFaqDto, CreateTestimonialDto, UpdateTestimonialDto, CreateGalleryDto, UpdateGalleryDto, CreateContactMessageDto, CmsFilterDto, GalleryFilterDto } from './dto/cms.dto';
export declare class CmsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPages(filters: CmsFilterDto): Promise<{
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
    findOnePageBySlug(slug: string): Promise<{
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
    findOnePage(id: string): Promise<{
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
    findAllBlogs(filters: CmsFilterDto): Promise<{
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
    findAllBlogsAdmin(filters: CmsFilterDto): Promise<{
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
    findOneBlogBySlug(slug: string): Promise<{
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
    findOneBlog(id: string): Promise<{
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
    incrementBlogViewCount(slug: string): Promise<{
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
    findAllFaqs(filters: CmsFilterDto): Promise<{
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
    findAllFaqsAdmin(filters: CmsFilterDto): Promise<{
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
    findOneFaq(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        question: string;
        answer: string;
        sortOrder: number;
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
    findPublishedTestimonials(): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        rating: number;
        isPublished: boolean;
        patientName: string;
        patientAvatar: string | null;
    }[]>;
    findAllTestimonials(filters: CmsFilterDto): Promise<{
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
    findOneTestimonial(id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        rating: number;
        isPublished: boolean;
        patientName: string;
        patientAvatar: string | null;
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
    findGallery(filters: GalleryFilterDto): Promise<{
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
    findAllGalleryAdmin(filters: GalleryFilterDto): Promise<{
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
    findOneGallery(id: string): Promise<{
        title: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        category: string | null;
        fileUrl: string;
        fileType: string;
        sortOrder: number;
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
    findAllContactMessages(filters: CmsFilterDto): Promise<{
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
