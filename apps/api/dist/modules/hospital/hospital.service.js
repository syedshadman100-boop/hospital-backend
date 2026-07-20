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
exports.HospitalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let HospitalService = class HospitalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findBySlug(slug) {
        const hospital = await this.prisma.hospital.findFirst({
            where: { slug, isActive: true },
            include: {
                departments: { where: { isActive: true }, select: { id: true, name: true, description: true } },
                _count: { select: { doctors: true, departments: true, patients: true } },
            },
        });
        if (!hospital)
            throw new common_1.NotFoundException('Hospital not found');
        return hospital;
    }
    async getSettings(slug) {
        const hospital = await this.prisma.hospital.findFirst({
            where: { slug, isActive: true },
            select: { id: true, name: true },
        });
        if (!hospital)
            throw new common_1.NotFoundException('Hospital not found');
        const settings = await this.prisma.hospitalSetting.findMany({
            where: { hospitalId: hospital.id },
        });
        const map = {};
        for (const s of settings) {
            map[s.key] = s.value;
        }
        return { hospitalId: hospital.id, name: hospital.name, settings: map };
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const where = {
            isActive: true,
            ...(search
                ? { name: { contains: search } }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.hospital.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.hospital.count({ where }),
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
        const hospital = await this.prisma.hospital.findUnique({ where: { id } });
        if (!hospital)
            throw new common_1.NotFoundException('Hospital not found');
        return hospital;
    }
    async create(dto) {
        const existing = await this.prisma.hospital.findUnique({
            where: { slug: dto.slug },
        });
        if (existing)
            throw new common_1.ConflictException('Hospital with this slug already exists');
        return this.prisma.hospital.create({ data: dto });
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.slug) {
            const existing = await this.prisma.hospital.findFirst({
                where: { slug: dto.slug, id: { not: id } },
            });
            if (existing)
                throw new common_1.ConflictException('Hospital with this slug already exists');
        }
        return this.prisma.hospital.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.hospital.update({
            where: { id },
            data: { isActive: false },
        });
    }
};
exports.HospitalService = HospitalService;
exports.HospitalService = HospitalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HospitalService);
//# sourceMappingURL=hospital.service.js.map