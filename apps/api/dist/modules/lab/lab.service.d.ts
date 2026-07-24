import { PrismaService } from '../../prisma/prisma.service';
import { CreateLabTestDto, UpdateLabTestDto, CreateLabReportDto, UpdateLabReportStatusDto, LabReportFilterDto } from './dto/lab.dto';
export declare class LabService {
    private prisma;
    constructor(prisma: PrismaService);
    createTest(dto: CreateLabTestDto, hospitalId: string): Promise<any>;
    findAllTests(hospitalId: string): Promise<any[]>;
    findOneTest(id: string): Promise<any>;
    updateTest(id: string, dto: UpdateLabTestDto): Promise<any>;
    removeTest(id: string): Promise<any>;
    createReport(dto: CreateLabReportDto, hospitalId: string): Promise<any>;
    findAllReports(hospitalId: string, filters: LabReportFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateReportStatus(id: string, dto: UpdateLabReportStatusDto): Promise<any>;
    getReportsByPatient(patientId: string): Promise<any[]>;
}
