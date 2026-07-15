import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateMedicineDto,
  UpdateMedicineDto,
  MedicineFilterDto,
  UpdateStockDto,
} from './dto/pharmacy.dto';

@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}

  async findAll(hospitalId: string, filters: MedicineFilterDto) {
    const { category, search, lowStock, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const baseWhere: any = {
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

  async findOne(id: string) {
    const medicine = await this.prisma.medicine.findUnique({ where: { id } });
    if (!medicine) throw new NotFoundException('Medicine not found');
    return medicine;
  }

  async create(dto: CreateMedicineDto, hospitalId: string) {
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

  async update(id: string, dto: UpdateMedicineDto) {
    await this.findOne(id);

    const updateData: any = { ...dto };
    if (dto.expiryDate) {
      updateData.expiryDate = new Date(dto.expiryDate);
    }

    return this.prisma.medicine.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.medicine.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async updateStock(id: string, dto: UpdateStockDto) {
    const medicine = await this.findOne(id);

    const newQuantity =
      dto.operation === 'add'
        ? medicine.stockQuantity + dto.quantity
        : medicine.stockQuantity - dto.quantity;

    if (newQuantity < 0) {
      throw new BadRequestException(
        `Insufficient stock. Current stock: ${medicine.stockQuantity}, requested deduction: ${dto.quantity}`,
      );
    }

    return this.prisma.medicine.update({
      where: { id },
      data: { stockQuantity: newQuantity },
    });
  }

  async getLowStockMedicines(hospitalId: string) {
    const medicines = await this.prisma.medicine.findMany({
      where: { hospitalId, isActive: true },
      orderBy: { stockQuantity: 'asc' },
    });
    return medicines.filter((m) => m.stockQuantity < m.minStock);
  }
}
