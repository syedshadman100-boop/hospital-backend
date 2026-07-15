import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

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
