import { PrismaService } from '../../prisma/prisma.service';
import { CreateMedicineDto, UpdateMedicineDto, MedicineFilterDto, UpdateStockDto } from './dto/pharmacy.dto';
export declare class PharmacyService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(hospitalId: string, filters: MedicineFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateMedicineDto, hospitalId: string): Promise<any>;
    update(id: string, dto: UpdateMedicineDto): Promise<any>;
    remove(id: string): Promise<any>;
    updateStock(id: string, dto: UpdateStockDto): Promise<any>;
    getLowStockMedicines(hospitalId: string): Promise<any[]>;
}
