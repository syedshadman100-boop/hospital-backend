import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStaffDto, UpdateStaffDto, StaffFilterDto } from './dto/staff.dto';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async findAll(hospitalId: string, filters: StaffFilterDto) {
    const { department, shift, isActive, search, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      hospitalId,
      ...(department && { department }),
      ...(shift && { shift }),
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
          { employeeId: { contains: search } },
          { designation: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.staff.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { attendance: true, leaves: true } },
        },
      }),
      this.prisma.staff.count({ where }),
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
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      include: {
        attendance: {
          orderBy: { date: 'desc' },
          take: 30,
        },
        leaves: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  async create(dto: CreateStaffDto, hospitalId: string) {
    if (dto.email) {
      const existing = await this.prisma.staff.findFirst({
        where: { email: dto.email, hospitalId },
      });
      if (existing) {
        throw new ConflictException('A staff member with this email already exists in this hospital');
      }
    }

    const employeeId = await this.generateEmployeeId(hospitalId);

    return this.prisma.staff.create({
      data: {
        hospitalId,
        employeeId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
        department: dto.department,
        designation: dto.designation,
        joinDate: dto.joinDate ? new Date(dto.joinDate) : null,
        salary: dto.salary,
        shift: dto.shift,
      },
    });
  }

  async update(id: string, dto: UpdateStaffDto) {
    await this.findOne(id);

    if (dto.email) {
      const existing = await this.prisma.staff.findFirst({
        where: { email: dto.email, id: { not: id } },
      });
      if (existing) {
        throw new ConflictException('A staff member with this email already exists');
      }
    }

    const updateData: any = { ...dto };
    if (dto.dateOfBirth) {
      updateData.dateOfBirth = new Date(dto.dateOfBirth);
    }
    if (dto.joinDate) {
      updateData.joinDate = new Date(dto.joinDate);
    }

    return this.prisma.staff.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.staff.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async markAttendance(
    staffId: string,
    date: string,
    checkIn?: string,
    checkOut?: string,
    status?: string,
  ) {
    await this.findOne(staffId);

    const attendanceDate = new Date(date);
    if (isNaN(attendanceDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return this.prisma.attendance.upsert({
      where: {
        staffId_date: { staffId, date: attendanceDate },
      },
      update: {
        ...(checkIn && { checkIn: new Date(checkIn) }),
        ...(checkOut && { checkOut: new Date(checkOut) }),
        ...(status && { status }),
      },
      create: {
        staffId,
        date: attendanceDate,
        checkIn: checkIn ? new Date(checkIn) : null,
        checkOut: checkOut ? new Date(checkOut) : null,
        status: status || 'present',
      },
    });
  }

  async getAttendance(staffId: string, startDate: string, endDate: string) {
    await this.findOne(staffId);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return this.prisma.attendance.findMany({
      where: {
        staffId,
        date: { gte: start, lte: end },
      },
      orderBy: { date: 'asc' },
    });
  }

  async applyLeave(
    staffId: string,
    type: string,
    startDate: string,
    endDate: string,
    reason?: string,
  ) {
    await this.findOne(staffId);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    if (end < start) {
      throw new BadRequestException('End date must be after start date');
    }

    return this.prisma.leave.create({
      data: {
        staffId,
        type,
        startDate: start,
        endDate: end,
        reason,
      },
    });
  }

  async getLeaves(staffId: string, status?: string) {
    await this.findOne(staffId);

    return this.prisma.leave.findMany({
      where: {
        staffId,
        ...(status && { status }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async generateEmployeeId(hospitalId: string): Promise<string> {
    const lastStaff = await this.prisma.staff.findFirst({
      where: { hospitalId },
      orderBy: { createdAt: 'desc' },
      select: { employeeId: true },
    });

    if (!lastStaff) {
      return 'EMP-001';
    }

    const lastNumber = parseInt(lastStaff.employeeId.replace('EMP-', ''), 10);
    const nextNumber = lastNumber + 1;
    return `EMP-${String(nextNumber).padStart(3, '0')}`;
  }
}
