import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateMedicalRecordDto,
  CreatePrescriptionDto,
  MedicalRecordFilterDto,
} from './dto/medical-record.dto';

@Injectable()
export class MedicalRecordService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMedicalRecordDto, hospitalId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: dto.patientId, hospitalId, isActive: true },
    });
    if (!patient) {
      throw new BadRequestException('Patient not found in this hospital');
    }

    if (dto.appointmentId) {
      const appointment = await this.prisma.appointment.findFirst({
        where: { id: dto.appointmentId, hospitalId },
      });
      if (!appointment) {
        throw new BadRequestException('Appointment not found in this hospital');
      }

      const existing = await this.prisma.medicalRecord.findFirst({
        where: { appointmentId: dto.appointmentId },
      });
      if (existing) {
        throw new BadRequestException('A medical record already exists for this appointment');
      }
    }

    return this.prisma.medicalRecord.create({
      data: {
        hospitalId,
        patientId: dto.patientId,
        appointmentId: dto.appointmentId || null,
        diagnosis: dto.diagnosis,
        symptoms: dto.symptoms,
        notes: dto.notes,
        vitals: dto.vitals ? JSON.parse(JSON.stringify(dto.vitals)) : undefined,
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : null,
      },
      include: {
        patient: {
          select: { id: true, firstName: true, lastName: true, phone: true },
        },
        appointment: {
          select: { id: true, appointmentDate: true, startTime: true },
        },
        prescriptions: true,
      },
    });
  }

  async findAll(hospitalId: string, filters: MedicalRecordFilterDto) {
    const { patientId, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      hospitalId,
      ...(patientId && { patientId }),
    };

    const [data, total] = await Promise.all([
      this.prisma.medicalRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: {
            select: { id: true, firstName: true, lastName: true, phone: true },
          },
          appointment: {
            select: { id: true, appointmentDate: true, startTime: true },
          },
          prescriptions: true,
          _count: { select: { labReports: true } },
        },
      }),
      this.prisma.medicalRecord.count({ where }),
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
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        patient: {
          select: { id: true, firstName: true, lastName: true, phone: true, email: true, gender: true, dateOfBirth: true },
        },
        appointment: {
          select: { id: true, appointmentDate: true, startTime: true, endTime: true, consultationType: true },
        },
        prescriptions: true,
        labReports: {
          include: {
            labTest: { select: { id: true, name: true, category: true, price: true } },
          },
        },
      },
    });
    if (!record) throw new NotFoundException('Medical record not found');
    return record;
  }

  async addPrescriptions(dto: CreatePrescriptionDto) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id: dto.medicalRecordId },
    });
    if (!record) throw new NotFoundException('Medical record not found');

    const created = await this.prisma.prescription.createMany({
      data: dto.prescriptions.map((p) => ({
        medicalRecordId: dto.medicalRecordId,
        medicineName: p.medicineName,
        dosage: p.dosage,
        frequency: p.frequency,
        duration: p.duration,
        instructions: p.instructions,
        isBeforeFood: p.isBeforeFood ?? true,
      })),
    });

    return this.prisma.prescription.findMany({
      where: { medicalRecordId: dto.medicalRecordId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPatientTimeline(patientId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
      select: { id: true, firstName: true, lastName: true, phone: true, email: true },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const records = await this.prisma.medicalRecord.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: {
        prescriptions: true,
        labReports: {
          include: {
            labTest: { select: { id: true, name: true, category: true } },
          },
        },
      },
    });

    const timeline: { type: string; date: Date; data: any }[] = records.map((r) => ({
      type: 'medical_record',
      date: r.createdAt,
      data: r,
    }));

    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

    return { patient, timeline };
  }
}
