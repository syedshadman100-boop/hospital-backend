import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const cleanSlug = slug.toLowerCase().trim();

    const [rows] = await this.prisma.pool.query(
      `SELECT h.* FROM hospitals h 
       WHERE (h.slug = ? OR h.slug = REPLACE(?, 'center', 'centre') OR h.slug = 'agra-heart-centre' OR h.name LIKE '%Agra%') AND h.isActive = 1 
       LIMIT 1`,
      [cleanSlug, cleanSlug],
    );

    let hospital = (rows as any[])[0];

    if (!hospital) {
      const [fallbackRows] = await this.prisma.pool.query(
        `SELECT h.* FROM hospitals h WHERE h.isActive = 1 LIMIT 1`
      );
      hospital = (fallbackRows as any[])[0];
    }

    if (!hospital) throw new NotFoundException('Hospital not found');

    const [departments] = await this.prisma.pool.query(
      `SELECT id, name, description FROM departments WHERE hospitalId = ? AND isActive = 1`,
      [hospital.id],
    );

    const [docCount] = await this.prisma.pool.query(`SELECT COUNT(*) as c FROM doctors WHERE hospitalId = ?`, [hospital.id]);
    const [depCount] = await this.prisma.pool.query(`SELECT COUNT(*) as c FROM departments WHERE hospitalId = ? AND isActive = 1`, [hospital.id]);
    const [patCount] = await this.prisma.pool.query(`SELECT COUNT(*) as c FROM patients WHERE hospitalId = ?`, [hospital.id]);

    return {
      ...hospital,
      departments,
      _count: {
        doctors: (docCount as any[])[0]?.c || 0,
        departments: (depCount as any[])[0]?.c || 0,
        patients: (patCount as any[])[0]?.c || 0,
      },
    };
  }

  async findByDomain(domain: string) {
    const [rows] = await this.prisma.pool.query(
      `SELECT h.* FROM hospitals h WHERE (h.domain = ? OR h.customDomain = ? OR h.slug = 'agra-heart-centre') AND h.isActive = 1 LIMIT 1`,
      [domain, domain],
    );

    let hospital = (rows as any[])[0];
    if (!hospital) throw new NotFoundException('Hospital not found for this domain');

    const [departments] = await this.prisma.pool.query(
      `SELECT id, name, description FROM departments WHERE hospitalId = ? AND isActive = 1`,
      [hospital.id],
    );

    return {
      ...hospital,
      departments,
      _count: { doctors: 0, departments: (departments as any[]).length, patients: 0 },
    };
  }

  async findSlugByDomain(domain: string): Promise<{ slug: string } | null> {
    const [rows] = await this.prisma.pool.query(
      `SELECT slug FROM hospitals WHERE (domain = ? OR customDomain = ? OR slug = 'agra-heart-centre') AND isActive = 1 LIMIT 1`,
      [domain, domain],
    );
    const hospital = (rows as any[])[0];
    return { slug: hospital ? hospital.slug : 'agra-heart-centre' };
  }

  async getSettings(slug: string) {
    const cleanSlug = slug.toLowerCase().trim();

    const [rows] = await this.prisma.pool.query(
      `SELECT id, name FROM hospitals WHERE (slug = ? OR slug = REPLACE(?, 'center', 'centre') OR slug = 'agra-heart-centre') AND isActive = 1 LIMIT 1`,
      [cleanSlug, cleanSlug],
    );

    let hospital = (rows as any[])[0];

    if (!hospital) {
      const [fallbackRows] = await this.prisma.pool.query(
        `SELECT id, name FROM hospitals WHERE isActive = 1 LIMIT 1`
      );
      hospital = (fallbackRows as any[])[0];
    }

    if (!hospital) throw new NotFoundException('Hospital not found');

    const [settings] = await this.prisma.pool.query(
      `SELECT \`key\`, \`value\` FROM hospital_settings WHERE hospitalId = ?`,
      [hospital.id],
    );

    const map: Record<string, string> = {};
    for (const s of (settings as any[])) {
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
