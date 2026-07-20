import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDoctorDto, UpdateDoctorDto, DoctorFilterDto } from './dto/doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async findAll(hospitalId: string | undefined, filters: DoctorFilterDto) {
    const { departmentId, isAvailable, isOnline, search, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(hospitalId ? { hospitalId } : {}),
      ...(departmentId && { departmentId }),
      ...(isAvailable !== undefined && { isAvailable }),
      ...(isOnline !== undefined && { isOnline }),
      ...(search && {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
          { specialization: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          department: { select: { id: true, name: true } },
          _count: { select: { appointments: true, schedules: true } },
        },
      }),
      this.prisma.doctor.count({ where }),
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
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        department: { select: { id: true, name: true, description: true } },
        schedules: { where: { isActive: true }, orderBy: { dayOfWeek: 'asc' } },
        _count: { select: { appointments: true, vacations: true } },
      },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async create(dto: CreateDoctorDto, hospitalId: string) {
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { email: dto.email },
    });
    if (existingDoctor) {
      throw new ConflictException('A doctor with this email already exists');
    }

    const departmentWhere: any = { id: dto.departmentId };
    if (hospitalId) {
      departmentWhere.hospitalId = hospitalId;
    }
    const department = await this.prisma.department.findFirst({
      where: departmentWhere,
    });
    if (!department) {
      throw new BadRequestException('Department not found in this hospital');
    }

    const resolvedHospitalId = hospitalId || department.hospitalId;

    return this.prisma.doctor.create({
      data: {
        hospitalId: resolvedHospitalId,
        departmentId: dto.departmentId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
        qualification: dto.qualification,
        experience: dto.experience ?? 0,
        specialization: dto.specialization,
        bio: dto.bio,
        consultationFee: dto.consultationFee ?? 0,
        languages: dto.languages,
        achievements: dto.achievements,
        memberships: dto.memberships,
        consultationTypes: dto.consultationTypes,
        videoConsultUrl: dto.videoConsultUrl,
      },
      include: {
        department: { select: { id: true, name: true } },
      },
    });
  }

  async update(id: string, dto: UpdateDoctorDto) {
    const existing = await this.findOne(id);

    if (dto.email && dto.email !== existing.email) {
      const emailTaken = await this.prisma.doctor.findUnique({
        where: { email: dto.email },
      });
      if (emailTaken) {
        throw new ConflictException('A doctor with this email already exists');
      }
    }

    if (dto.departmentId) {
      const department = await this.prisma.department.findFirst({
        where: { id: dto.departmentId, hospitalId: existing.hospitalId },
      });
      if (!department) {
        throw new BadRequestException('Department not found in this hospital');
      }
    }

    const updateData: any = { ...dto };
    if (dto.dateOfBirth) {
      updateData.dateOfBirth = new Date(dto.dateOfBirth);
    }

    return this.prisma.doctor.update({
      where: { id },
      data: updateData,
      include: {
        department: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.doctor.update({
      where: { id },
      data: { isAvailable: false },
    });
  }

  async getDoctorSchedule(doctorId: string) {
    await this.findOne(doctorId);
    return this.prisma.doctorSchedule.findMany({
      where: { doctorId },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  async updateSchedule(
    doctorId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    slotDuration: number,
  ) {
    await this.findOne(doctorId);

    if (dayOfWeek < 0 || dayOfWeek > 6) {
      throw new BadRequestException('dayOfWeek must be between 0 (Sunday) and 6 (Saturday)');
    }

    if (slotDuration < 5 || slotDuration > 120) {
      throw new BadRequestException('slotDuration must be between 5 and 120 minutes');
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      throw new BadRequestException('Time must be in HH:MM format (24-hour)');
    }

    if (startTime >= endTime) {
      throw new BadRequestException('startTime must be before endTime');
    }

    return this.prisma.doctorSchedule.upsert({
      where: {
        doctorId_dayOfWeek: { doctorId, dayOfWeek },
      },
      update: { startTime, endTime, slotDuration, isActive: true },
      create: { doctorId, dayOfWeek, startTime, endTime, slotDuration },
    });
  }

  async getAvailableSlots(doctorId: string, date: string) {
    await this.findOne(doctorId);

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }

    const dayOfWeek = appointmentDate.getDay();

    const schedule = await this.prisma.doctorSchedule.findUnique({
      where: { doctorId_dayOfWeek: { doctorId, dayOfWeek } },
    });

    if (!schedule || !schedule.isActive) {
      return { data: [] };
    }

    const existingAppointments = await this.prisma.$queryRaw<
      { startTime: string }[]
    >`SELECT startTime FROM appointments 
      WHERE doctorId = ${doctorId} 
      AND DATE(appointmentDate) = ${date}
      AND status IN ('scheduled', 'confirmed', 'in_progress')`;

    const bookedSlots = new Set(
      existingAppointments.map((apt) => apt.startTime),
    );

    const allSlots: { time: string; isBooked: boolean }[] = [];
    const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
    const [endHour, endMinute] = schedule.endTime.split(':').map(Number);

    let currentMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    while (currentMinutes + schedule.slotDuration <= endMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const minutes = currentMinutes % 60;
      const time24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

      let h = hours;
      const period = h >= 12 ? 'PM' : 'AM';
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
      const label = `${String(h).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;

      allSlots.push({ time: label, isBooked: bookedSlots.has(time24) });

      currentMinutes += schedule.slotDuration;
    }

    return { data: allSlots };
  }
}
