import { PharmacyService } from './pharmacy.service';
import { CreateMedicineDto, UpdateMedicineDto, MedicineFilterDto, UpdateStockDto } from './dto/pharmacy.dto';
export declare class PharmacyController {
    private pharmacyService;
    constructor(pharmacyService: PharmacyService);
    findAll(user: any, filters: MedicineFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getLowStock(user: any): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(dto: CreateMedicineDto, user: any): Promise<any>;
    update(id: string, dto: UpdateMedicineDto): Promise<any>;
    remove(id: string): Promise<any>;
    updateStock(id: string, dto: UpdateStockDto): Promise<any>;
}
