import { PrismaService } from '../../prisma/prisma.service';
import { CreateLabTestDto, UpdateLabTestDto, CreateLabReportDto, UpdateLabReportStatusDto, LabReportFilterDto } from './dto/lab.dto';
export declare class LabService {
    private prisma;
    constructor(prisma: PrismaService);
    createTest(dto: CreateLabTestDto, hospitalId: string): Promise<{
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        turnaroundTime: string | null;
    }>;
    findAllTests(hospitalId: string): Promise<({
        _count: {
            labReports: number;
        };
    } & {
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        turnaroundTime: string | null;
    })[]>;
    findOneTest(id: string): Promise<{
        labReports: ({
            medicalRecord: {
                id: string;
                patientId: string;
                diagnosis: string | null;
            };
        } & {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            result: string | null;
            status: string;
            medicalRecordId: string;
            labTestId: string;
            fileUrl: string | null;
            completedAt: Date | null;
        })[];
    } & {
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        turnaroundTime: string | null;
    }>;
    updateTest(id: string, dto: UpdateLabTestDto): Promise<{
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        turnaroundTime: string | null;
    }>;
    removeTest(id: string): Promise<{
        description: string | null;
        id: string;
        hospitalId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        turnaroundTime: string | null;
    }>;
    createReport(dto: CreateLabReportDto, hospitalId: string): Promise<{
        medicalRecord: {
            id: string;
            diagnosis: string | null;
        };
        labTest: {
            id: string;
            name: string;
            category: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        status: string;
        medicalRecordId: string;
        labTestId: string;
        fileUrl: string | null;
        completedAt: Date | null;
    }>;
    findAllReports(hospitalId: string, filters: LabReportFilterDto): Promise<{
        data: ({
            medicalRecord: {
                id: string;
                patientId: string;
                diagnosis: string | null;
            };
            labTest: {
                id: string;
                name: string;
                category: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            hospitalId: string;
            createdAt: Date;
            updatedAt: Date;
            result: string | null;
            status: string;
            medicalRecordId: string;
            labTestId: string;
            fileUrl: string | null;
            completedAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateReportStatus(id: string, dto: UpdateLabReportStatusDto): Promise<{
        labTest: {
            id: string;
            name: string;
            category: string | null;
        };
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        status: string;
        medicalRecordId: string;
        labTestId: string;
        fileUrl: string | null;
        completedAt: Date | null;
    }>;
    getReportsByPatient(patientId: string): Promise<({
        medicalRecord: {
            id: string;
            createdAt: Date;
            diagnosis: string | null;
        };
        labTest: {
            id: string;
            name: string;
            category: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        hospitalId: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        status: string;
        medicalRecordId: string;
        labTestId: string;
        fileUrl: string | null;
        completedAt: Date | null;
    })[]>;
}
