"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PharmacyService = class PharmacyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(hospitalId, filters) {
        const { category, search, lowStock, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const baseWhere = {
            hospitalId,
            isActive: true,
            ...(category && { category }),
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { genericName: { contains: search } },
                    { manufacturer: { contains: search } },
                    { batchNumber: { contains: search } },
                ],
            }),
        };
        if (lowStock) {
            const all = await this.prisma.medicine.findMany({
                where: baseWhere,
                orderBy: { stockQuantity: 'asc' },
            });
            const filtered = all.filter((m) => m.stockQuantity < m.minStock);
            const total = filtered.length;
            const data = filtered.slice(skip, skip + limit);
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
        const [data, total] = await Promise.all([
            this.prisma.medicine.findMany({
                where: baseWhere,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.medicine.count({ where: baseWhere }),
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
    async findOne(id) {
        const medicine = await this.prisma.medicine.findUnique({ where: { id } });
        if (!medicine)
            throw new common_1.NotFoundException('Medicine not found');
        return medicine;
    }
    async create(dto, hospitalId) {
        return this.prisma.medicine.create({
            data: {
                hospitalId,
                name: dto.name,
                genericName: dto.genericName,
                category: dto.category,
                manufacturer: dto.manufacturer,
                unit: dto.unit ?? 'strip',
                price: dto.price,
                stockQuantity: dto.stockQuantity ?? 0,
                minStock: dto.minStock ?? 10,
                expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
                batchNumber: dto.batchNumber,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        const updateData = { ...dto };
        if (dto.expiryDate) {
            updateData.expiryDate = new Date(dto.expiryDate);
        }
        return this.prisma.medicine.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.medicine.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async updateStock(id, dto) {
        const medicine = await this.findOne(id);
        const newQuantity = dto.operation === 'add'
            ? medicine.stockQuantity + dto.quantity
            : medicine.stockQuantity - dto.quantity;
        if (newQuantity < 0) {
            throw new common_1.BadRequestException(`Insufficient stock. Current stock: ${medicine.stockQuantity}, requested deduction: ${dto.quantity}`);
        }
        return this.prisma.medicine.update({
            where: { id },
            data: { stockQuantity: newQuantity },
        });
    }
    async getLowStockMedicines(hospitalId) {
        const medicines = await this.prisma.medicine.findMany({
            where: { hospitalId, isActive: true },
            orderBy: { stockQuantity: 'asc' },
        });
        return medicines.filter((m) => m.stockQuantity < m.minStock);
    }
};
exports.PharmacyService = PharmacyService;
exports.PharmacyService = PharmacyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PharmacyService);
//# sourceMappingURL=pharmacy.service.js.map