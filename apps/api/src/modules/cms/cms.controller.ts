import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CmsService } from './cms.service';
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  // ─── Public Routes ───────────────────────────────────────

  @Get('pages/:slug')
  @ApiOperation({ summary: 'Get page by slug (public)' })
  getPageBySlug(@Param('slug') slug: string) {
    return this.cmsService.findOnePageBySlug(slug);
  }

  @Get('blogs')
  @ApiOperation({ summary: 'Get published blogs (public)' })
  getBlogs(@Query() filters: CmsFilterDto) {
    return this.cmsService.findAllBlogs(filters);
  }

  @Get('blogs/:slug')
  @ApiOperation({ summary: 'Get blog by slug (public)' })
  async getBlogBySlug(@Param('slug') slug: string) {
    const blog = await this.cmsService.findOneBlogBySlug(slug);
    await this.cmsService.incrementBlogViewCount(slug);
    return blog;
  }

  @Get('faqs')
  @ApiOperation({ summary: 'Get active FAQs (public)' })
  getFaqs(@Query() filters: CmsFilterDto) {
    return this.cmsService.findAllFaqs(filters);
  }

  @Get('testimonials')
  @ApiOperation({ summary: 'Get published testimonials (public)' })
  getTestimonials() {
    return this.cmsService.findPublishedTestimonials();
  }

  @Get('gallery')
  @ApiOperation({ summary: 'Get gallery items (public)' })
  getGallery(@Query() filters: GalleryFilterDto) {
    return this.cmsService.findGallery(filters);
  }

  @Post('contact')
  @ApiOperation({ summary: 'Submit contact message (public)' })
  createContactMessage(@Body() dto: CreateContactMessageDto) {
    return this.cmsService.createContactMessage(dto);
  }

  // ─── Admin Routes ────────────────────────────────────────

  @Get('admin/pages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all CMS pages (admin)' })
  getPagesAdmin(@Query() filters: CmsFilterDto) {
    return this.cmsService.findAllPages(filters);
  }

  @Post('admin/pages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create CMS page (admin)' })
  createPage(@Body() dto: CreateCmsPageDto) {
    return this.cmsService.createPage(dto);
  }

  @Put('admin/pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update CMS page (admin)' })
  updatePage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCmsPageDto,
  ) {
    return this.cmsService.updatePage(id, dto);
  }

  @Delete('admin/pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete CMS page (admin)' })
  removePage(@Param('id', ParseUUIDPipe) id: string) {
    return this.cmsService.removePage(id);
  }

  @Get('admin/blogs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all blogs including drafts (admin)' })
  getBlogsAdmin(@Query() filters: CmsFilterDto) {
    return this.cmsService.findAllBlogsAdmin(filters);
  }

  @Post('admin/blogs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create blog (admin)' })
  createBlog(@Body() dto: CreateBlogDto) {
    return this.cmsService.createBlog(dto);
  }

  @Put('admin/blogs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog (admin)' })
  updateBlog(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.cmsService.updateBlog(id, dto);
  }

  @Delete('admin/blogs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog (admin)' })
  removeBlog(@Param('id', ParseUUIDPipe) id: string) {
    return this.cmsService.removeBlog(id);
  }

  @Get('admin/faqs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all FAQs including inactive (admin)' })
  getFaqsAdmin(@Query() filters: CmsFilterDto) {
    return this.cmsService.findAllFaqsAdmin(filters);
  }

  @Post('admin/faqs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create FAQ (admin)' })
  createFaq(@Body() dto: CreateFaqDto) {
    return this.cmsService.createFaq(dto);
  }

  @Put('admin/faqs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update FAQ (admin)' })
  updateFaq(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFaqDto,
  ) {
    return this.cmsService.updateFaq(id, dto);
  }

  @Delete('admin/faqs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete FAQ (admin)' })
  removeFaq(@Param('id', ParseUUIDPipe) id: string) {
    return this.cmsService.removeFaq(id);
  }

  @Get('admin/testimonials')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all testimonials (admin)' })
  getTestimonialsAdmin(@Query() filters: CmsFilterDto) {
    return this.cmsService.findAllTestimonials(filters);
  }

  @Post('admin/testimonials')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create testimonial (admin)' })
  createTestimonial(@Body() dto: CreateTestimonialDto) {
    return this.cmsService.createTestimonial(dto);
  }

  @Put('admin/testimonials/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update testimonial (admin)' })
  updateTestimonial(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTestimonialDto,
  ) {
    return this.cmsService.updateTestimonial(id, dto);
  }

  @Delete('admin/testimonials/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete testimonial (admin)' })
  removeTestimonial(@Param('id', ParseUUIDPipe) id: string) {
    return this.cmsService.removeTestimonial(id);
  }

  @Get('admin/gallery')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all gallery items including inactive (admin)' })
  getGalleryAdmin(@Query() filters: GalleryFilterDto) {
    return this.cmsService.findAllGalleryAdmin(filters);
  }

  @Post('admin/gallery')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create gallery item (admin)' })
  createGallery(@Body() dto: CreateGalleryDto) {
    return this.cmsService.createGallery(dto);
  }

  @Put('admin/gallery/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gallery item (admin)' })
  updateGallery(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateGalleryDto,
  ) {
    return this.cmsService.updateGallery(id, dto);
  }

  @Delete('admin/gallery/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete gallery item (admin)' })
  removeGallery(@Param('id', ParseUUIDPipe) id: string) {
    return this.cmsService.removeGallery(id);
  }

  @Get('admin/contact-messages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List contact messages (admin)' })
  getContactMessages(@Query() filters: CmsFilterDto) {
    return this.cmsService.findAllContactMessages(filters);
  }

  @Put('admin/contact-messages/:id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark contact message as read (admin)' })
  markContactMessageAsRead(@Param('id', ParseUUIDPipe) id: string) {
    return this.cmsService.markContactMessageAsRead(id);
  }
}
