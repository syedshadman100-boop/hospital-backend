import { LabService } from './lab.service';
import { CreateLabTestDto, UpdateLabTestDto, CreateLabReportDto, UpdateLabReportStatusDto, LabReportFilterDto } from './dto/lab.dto';
export declare class LabController {
    private labService;
    constructor(labService: LabService);
    findAllTests(user: any): Promise<any[]>;
    findOneTest(id: string): Promise<any>;
    createTest(dto: CreateLabTestDto, user: any): Promise<any>;
    updateTest(id: string, dto: UpdateLabTestDto): Promise<any>;
    removeTest(id: string): Promise<any>;
    createReport(dto: CreateLabReportDto, user: any): Promise<any>;
    findAllReports(user: any, filters: LabReportFilterDto): Promise<{
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
