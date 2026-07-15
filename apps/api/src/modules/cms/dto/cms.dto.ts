import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsUrl,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

// ─── CMS Page ────────────────────────────────────────────

export class CreateCmsPageDto {
  @ApiProperty({ example: 'about-us' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'About Us' })
  @IsString()
  title: string;

  @ApiProperty({ example: '<p>We are a leading hospital...</p>' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 'About Us - Hospital Name' })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiPropertyOptional({ example: 'Learn more about our hospital' })
  @IsOptional()
  @IsString()
  metaDesc?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class UpdateCmsPageDto extends PartialType(CreateCmsPageDto) {}

// ─── Blog ────────────────────────────────────────────────

export class CreateBlogDto {
  @ApiProperty({ example: 'Tips for Better Heart Health' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'tips-for-better-heart-health' })
  @IsString()
  slug: string;

  @ApiProperty({ example: '<p>Maintaining heart health is essential...</p>' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 'Simple tips to keep your heart healthy' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ example: 'Dr. Sharma' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ example: 'heart,health,cardiology' })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional({ example: 'Health Tips' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

// ─── FAQ ─────────────────────────────────────────────────

export class CreateFaqDto {
  @ApiProperty({ example: 'What are the visiting hours?' })
  @IsString()
  question: string;

  @ApiProperty({ example: 'Visiting hours are 10 AM to 8 PM.' })
  @IsString()
  answer: string;

  @ApiPropertyOptional({ example: 'General' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}

// ─── Testimonial ─────────────────────────────────────────

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Priya Patel' })
  @IsString()
  patientName: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Excellent care and treatment.' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}

// ─── Gallery ─────────────────────────────────────────────

export class CreateGalleryDto {
  @ApiPropertyOptional({ example: 'Hospital Lobby' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  fileUrl: string;

  @ApiProperty({ example: 'image', enum: ['image', 'video'] })
  @IsString()
  fileType: string;

  @ApiPropertyOptional({ example: 'Infrastructure' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateGalleryDto extends PartialType(CreateGalleryDto) {}

// ─── Contact Message ─────────────────────────────────────

export class CreateContactMessageDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  email: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Appointment Inquiry' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: 'I would like to book an appointment.' })
  @IsString()
  message: string;
}

// ─── CMS Filters ─────────────────────────────────────────

export class CmsFilterDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ example: 'Health Tips' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'search term' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class GalleryFilterDto {
  @ApiPropertyOptional({ example: 'image', enum: ['image', 'video'] })
  @IsOptional()
  @IsString()
  fileType?: string;

  @ApiPropertyOptional({ example: 'Infrastructure' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
