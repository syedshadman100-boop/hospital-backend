import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentFilterDto, PublicCreateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentService {
    private prisma;
    constructor(prisma: PrismaService);
    publicCreate(dto: PublicCreateAppointmentDto): Promise<{
        success: boolean;
        message: string;
        reference: string;
        appointment: {
            doctor: {
                firstName: string;
                lastName: string;
                id: string;
                specialization: string | null;
            };
            patient: {
                firstName: string;
                lastName: string;
                phone: string;
                id: string;
            };
        } & {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            startTime: string;
            endTime: string;
            appointmentDate: Date;
            patientId: string;
            status: string;
            notes: string | null;
            consultationType: string;
            reason: string | null;
            cancelReason: string | null;
            queueTokenId: string | null;
        };
    }>;
    create(dto: CreateAppointmentDto, hospitalId: string): Promise<({
        doctor: {
            firstName: string;
            lastName: string;
            id: string;
            specialization: string | null;
        };
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        startTime: string;
        endTime: string;
        appointmentDate: Date;
        patientId: string;
        status: string;
        notes: string | null;
        consultationType: string;
        reason: string | null;
        cancelReason: string | null;
        queueTokenId: string | null;
    }) | {
        queueToken: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            appointmentId: string | null;
            status: string;
            completedAt: Date | null;
            tokenNumber: number;
            priority: string;
            estimatedTime: number | null;
            calledAt: Date | null;
            queueId: string;
        };
        doctor: {
            firstName: string;
            lastName: string;
            id: string;
            specialization: string | null;
        };
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        startTime: string;
        endTime: string;
        appointmentDate: Date;
        patientId: string;
        status: string;
        notes: string | null;
        consultationType: string;
        reason: string | null;
        cancelReason: string | null;
        queueTokenId: string | null;
    }>;
    findAll(hospitalId: string, filters: AppointmentFilterDto): Promise<{
        data: ({
            doctor: {
                firstName: string;
                lastName: string;
                id: string;
                specialization: string | null;
            };
            patient: {
                firstName: string;
                lastName: string;
                phone: string;
                id: string;
            };
        } & {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            startTime: string;
            endTime: string;
            appointmentDate: Date;
            patientId: string;
            status: string;
            notes: string | null;
            consultationType: string;
            reason: string | null;
            cancelReason: string | null;
            queueTokenId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        doctor: {
            firstName: string;
            lastName: string;
            id: string;
            specialization: string | null;
            consultationFee: import("@prisma/client-runtime-utils").Decimal;
        };
        patient: {
            email: string | null;
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
            gender: string | null;
            dateOfBirth: Date | null;
        };
        queueToken: {
            id: string;
            status: string;
            tokenNumber: number;
            priority: string;
        } | null;
        medicalRecord: {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            appointmentId: string | null;
            notes: string | null;
            diagnosis: string | null;
            symptoms: string | null;
            vitals: import("@prisma/client/runtime/client").JsonValue | null;
            followUpDate: Date | null;
        } | null;
        invoice: {
            id: string;
            invoiceNumber: string;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            paidAmount: import("@prisma/client-runtime-utils").Decimal;
            status: string;
        } | null;
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        startTime: string;
        endTime: string;
        appointmentDate: Date;
        patientId: string;
        status: string;
        notes: string | null;
        consultationType: string;
        reason: string | null;
        cancelReason: string | null;
        queueTokenId: string | null;
    }>;
    update(id: string, dto: UpdateAppointmentDto): Promise<{
        doctor: {
            firstName: string;
            lastName: string;
            id: string;
        };
        patient: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        startTime: string;
        endTime: string;
        appointmentDate: Date;
        patientId: string;
        status: string;
        notes: string | null;
        consultationType: string;
        reason: string | null;
        cancelReason: string | null;
        queueTokenId: string | null;
    }>;
    getTodayAppointments(doctorId: string): Promise<({
        patient: {
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
        queueToken: {
            status: string;
            tokenNumber: number;
            priority: string;
        } | null;
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        startTime: string;
        endTime: string;
        appointmentDate: Date;
        patientId: string;
        status: string;
        notes: string | null;
        consultationType: string;
        reason: string | null;
        cancelReason: string | null;
        queueTokenId: string | null;
    })[]>;
    cancel(id: string, reason: string): Promise<{
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        startTime: string;
        endTime: string;
        appointmentDate: Date;
        patientId: string;
        status: string;
        notes: string | null;
        consultationType: string;
        reason: string | null;
        cancelReason: string | null;
        queueTokenId: string | null;
    }>;
    private getOrCreateQueue;
    private getNextTokenNumber;
}
