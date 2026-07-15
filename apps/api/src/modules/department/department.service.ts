import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async findAll(hospitalId?: string, page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
      ...(hospitalId ? { hospitalId } : {}),
      ...(search
        ? { name: { contains: search } }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.department.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { doctors: true } } },
      }),
      this.prisma.department.count({ where }),
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
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: { _count: { select: { doctors: true } } },
    });
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async create(dto: CreateDepartmentDto, hospitalId: string) {
    return this.prisma.department.create({
      data: { ...dto, hospitalId },
    });
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    await this.findOne(id);
    return this.prisma.department.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.department.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
