import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto, PatientFilterDto } from './dto/patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async findAll(hospitalId: string, filters: PatientFilterDto) {
    const { search, bloodGroup, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      hospitalId,
      isActive: true,
      ...(bloodGroup && { bloodGroup }),
      ...(search && {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { appointments: true, medicalRecords: true, invoices: true },
          },
        },
      }),
      this.prisma.patient.count({ where }),
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
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: {
          orderBy: { appointmentDate: 'desc' },
          take: 10,
          include: {
            doctor: {
              select: { id: true, firstName: true, lastName: true, specialization: true },
            },
          },
        },
        medicalRecords: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            prescriptions: true,
          },
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            invoiceNumber: true,
            totalAmount: true,
            paidAmount: true,
            status: true,
            createdAt: true,
          },
        },
        familyMembers: true,
        documents: true,
      },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async create(dto: CreatePatientDto, hospitalId: string) {
    if (dto.email) {
      const existingPatient = await this.prisma.patient.findFirst({
        where: { email: dto.email, hospitalId },
      });
      if (existingPatient) {
        throw new ConflictException('A patient with this email already exists in this hospital');
      }
    }

    return this.prisma.patient.create({
      data: {
        hospitalId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
        bloodGroup: dto.bloodGroup,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        pincode: dto.pincode,
        nationality: dto.nationality,
        emergencyContactName: dto.emergencyContactName,
        emergencyContactPhone: dto.emergencyContactPhone,
        emergencyContactRelation: dto.emergencyContactRelation,
        insuranceProvider: dto.insuranceProvider,
        insurancePolicyNumber: dto.insurancePolicyNumber,
        allergies: dto.allergies,
        medicalHistory: dto.medicalHistory,
      },
    });
  }

  async update(id: string, dto: UpdatePatientDto) {
    await this.findOne(id);

    if (dto.email) {
      const existingPatient = await this.prisma.patient.findFirst({
        where: { email: dto.email, id: { not: id } },
      });
      if (existingPatient) {
        throw new ConflictException('A patient with this email already exists');
      }
    }

    const updateData: any = { ...dto };
    if (dto.dateOfBirth) {
      updateData.dateOfBirth = new Date(dto.dateOfBirth);
    }

    return this.prisma.patient.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.patient.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getPatientHistory(patientId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
      select: { id: true, firstName: true, lastName: true, phone: true, email: true },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const [appointments, medicalRecords, invoices] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { patientId },
        orderBy: { appointmentDate: 'desc' },
        include: {
          doctor: {
            select: { id: true, firstName: true, lastName: true, specialization: true },
          },
        },
      }),
      this.prisma.medicalRecord.findMany({
        where: { patientId },
        orderBy: { createdAt: 'desc' },
        include: {
          prescriptions: true,
          labReports: {
            include: { labTest: { select: { id: true, name: true, category: true } } },
          },
        },
      }),
      this.prisma.invoice.findMany({
        where: { patientId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          invoiceNumber: true,
          totalAmount: true,
          paidAmount: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const timeline: { type: string; date: Date; data: any }[] = [
      ...appointments.map((a) => ({
        type: 'appointment' as const,
        date: a.appointmentDate,
        data: a,
      })),
      ...medicalRecords.map((r) => ({
        type: 'medical_record' as const,
        date: r.createdAt,
        data: r,
      })),
      ...invoices.map((i) => ({
        type: 'invoice' as const,
        date: i.createdAt,
        data: i,
      })),
    ];

    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

    return { patient, timeline };
  }
}
