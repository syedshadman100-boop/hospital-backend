import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const hospital = await this.prisma.hospital.findFirst({
      where: { slug, isActive: true },
      include: {
        departments: { where: { isActive: true }, select: { id: true, name: true, description: true } },
        _count: { select: { doctors: true, departments: true, patients: true } },
      },
    });
    if (!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  async findByDomain(domain: string) {
    const hospital = await this.prisma.hospital.findFirst({
      where: {
        isActive: true,
        OR: [
          { domain: domain },
          { customDomain: domain },
        ],
      },
      include: {
        departments: { where: { isActive: true }, select: { id: true, name: true, description: true } },
        _count: { select: { doctors: true, departments: true, patients: true } },
      },
    });
    if (!hospital) throw new NotFoundException('Hospital not found for this domain');
    return hospital;
  }

  async findSlugByDomain(domain: string): Promise<{ slug: string } | null> {
    const hospital = await this.prisma.hospital.findFirst({
      where: {
        isActive: true,
        OR: [
          { domain: domain },
          { customDomain: domain },
        ],
      },
      select: { slug: true },
    });
    return hospital ? { slug: hospital.slug } : null;
  }

  async getSettings(slug: string) {
    const hospital = await this.prisma.hospital.findFirst({
      where: { slug, isActive: true },
      select: { id: true, name: true },
    });
    if (!hospital) throw new NotFoundException('Hospital not found');

    const settings = await this.prisma.hospitalSetting.findMany({
      where: { hospitalId: hospital.id },
    });

    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return { hospitalId: hospital.id, name: hospital.name, settings: map };
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(search
        ? { name: { contains: search } }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.hospital.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.hospital.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const hospital = await this.prisma.hospital.findUnique({ where: { id } });
    if (!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  async create(dto: CreateHospitalDto) {
    const existing = await this.prisma.hospital.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) throw new ConflictException('Hospital with this slug already exists');

    return this.prisma.hospital.create({ data: dto });
  }

  async update(id: string, dto: UpdateHospitalDto) {
    await this.findOne(id);

    if (dto.slug) {
      const existing = await this.prisma.hospital.findFirst({
        where: { slug: dto.slug, id: { not: id } },
      });
      if (existing) throw new ConflictException('Hospital with this slug already exists');
    }

    return this.prisma.hospital.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.hospital.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
