export declare class CreateCmsPageDto {
    slug: string;
    title: string;
    content: string;
    metaTitle?: string;
    metaDesc?: string;
    isPublished?: boolean;
}
declare const UpdateCmsPageDto_base: import("@nestjs/common").Type<Partial<CreateCmsPageDto>>;
export declare class UpdateCmsPageDto extends UpdateCmsPageDto_base {
}
export declare class CreateBlogDto {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    author?: string;
    tags?: string;
    category?: string;
    isPublished?: boolean;
}
declare const UpdateBlogDto_base: import("@nestjs/common").Type<Partial<CreateBlogDto>>;
export declare class UpdateBlogDto extends UpdateBlogDto_base {
}
export declare class CreateFaqDto {
    question: string;
    answer: string;
    category?: string;
    sortOrder?: number;
}
declare const UpdateFaqDto_base: import("@nestjs/common").Type<Partial<CreateFaqDto>>;
export declare class UpdateFaqDto extends UpdateFaqDto_base {
}
export declare class CreateTestimonialDto {
    patientName: string;
    rating: number;
    content: string;
    isPublished?: boolean;
}
declare const UpdateTestimonialDto_base: import("@nestjs/common").Type<Partial<CreateTestimonialDto>>;
export declare class UpdateTestimonialDto extends UpdateTestimonialDto_base {
}
export declare class CreateGalleryDto {
    title?: string;
    fileUrl: string;
    fileType: string;
    category?: string;
    sortOrder?: number;
}
declare const UpdateGalleryDto_base: import("@nestjs/common").Type<Partial<CreateGalleryDto>>;
export declare class UpdateGalleryDto extends UpdateGalleryDto_base {
}
export declare class CreateContactMessageDto {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}
export declare class CmsFilterDto {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
}
export declare class GalleryFilterDto {
    fileType?: string;
    category?: string;
    page?: number;
    limit?: number;
}
export {};
