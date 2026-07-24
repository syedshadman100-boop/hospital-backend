import { HospitalService } from './hospital.service';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';
export declare class HospitalController {
    private hospitalService;
    constructor(hospitalService: HospitalService);
    findBySlug(slug: string): Promise<any>;
    getSettings(slug: string): Promise<{
        hospitalId: any;
        name: any;
        settings: Record<string, string>;
    }>;
    lookupByDomain(domain: string): Promise<{
        slug: string;
    } | null>;
    findByDomain(domain: string): Promise<any>;
    findAll(page?: string, limit?: string, search?: string): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateHospitalDto, user: any): Promise<any>;
    update(id: string, dto: UpdateHospitalDto): Promise<any>;
    remove(id: string): Promise<any>;
}
