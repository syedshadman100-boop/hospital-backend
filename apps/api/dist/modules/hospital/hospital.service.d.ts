import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';
export declare class HospitalService {
    private prisma;
    constructor(prisma: PrismaService);
    findBySlug(slug: string): Promise<any>;
    findByDomain(domain: string): Promise<any>;
    findSlugByDomain(domain: string): Promise<{
        slug: string;
    } | null>;
    getSettings(slug: string): Promise<{
        hospitalId: any;
        name: any;
        settings: Record<string, string>;
    }>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateHospitalDto): Promise<any>;
    update(id: string, dto: UpdateHospitalDto): Promise<any>;
    remove(id: string): Promise<any>;
}
