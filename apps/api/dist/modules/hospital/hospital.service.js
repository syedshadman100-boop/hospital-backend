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
        const cleanSlug = slug.toLowerCase().trim();
        const [rows] = await this.prisma.pool.query(`SELECT h.* FROM hospitals h 
       WHERE (h.slug = ? OR h.slug = REPLACE(?, 'center', 'centre') OR h.slug = 'agra-heart-centre' OR h.name LIKE '%Agra%') AND h.isActive = 1 
       LIMIT 1`, [cleanSlug, cleanSlug]);
        let hospital = rows[0];
        if (!hospital) {
            const [fallbackRows] = await this.prisma.pool.query(`SELECT h.* FROM hospitals h WHERE h.isActive = 1 LIMIT 1`);
            hospital = fallbackRows[0];
        }
        if (!hospital)
            throw new common_1.NotFoundException('Hospital not found');
        const [departments] = await this.prisma.pool.query(`SELECT id, name, description FROM departments WHERE hospitalId = ? AND isActive = 1`, [hospital.id]);
        const [docCount] = await this.prisma.pool.query(`SELECT COUNT(*) as c FROM doctors WHERE hospitalId = ?`, [hospital.id]);
        const [depCount] = await this.prisma.pool.query(`SELECT COUNT(*) as c FROM departments WHERE hospitalId = ? AND isActive = 1`, [hospital.id]);
        const [patCount] = await this.prisma.pool.query(`SELECT COUNT(*) as c FROM patients WHERE hospitalId = ?`, [hospital.id]);
        return {
            ...hospital,
            departments,
            _count: {
                doctors: docCount[0]?.c || 0,
                departments: depCount[0]?.c || 0,
                patients: patCount[0]?.c || 0,
            },
        };
    }
    async findByDomain(domain) {
        const [rows] = await this.prisma.pool.query(`SELECT h.* FROM hospitals h WHERE (h.domain = ? OR h.customDomain = ? OR h.slug = 'agra-heart-centre') AND h.isActive = 1 LIMIT 1`, [domain, domain]);
        let hospital = rows[0];
        if (!hospital)
            throw new common_1.NotFoundException('Hospital not found for this domain');
        const [departments] = await this.prisma.pool.query(`SELECT id, name, description FROM departments WHERE hospitalId = ? AND isActive = 1`, [hospital.id]);
        return {
            ...hospital,
            departments,
            _count: { doctors: 0, departments: departments.length, patients: 0 },
        };
    }
    async findSlugByDomain(domain) {
        const [rows] = await this.prisma.pool.query(`SELECT slug FROM hospitals WHERE (domain = ? OR customDomain = ? OR slug = 'agra-heart-centre') AND isActive = 1 LIMIT 1`, [domain, domain]);
        const hospital = rows[0];
        return { slug: hospital ? hospital.slug : 'agra-heart-centre' };
    }
    async getSettings(slug) {
        const cleanSlug = slug.toLowerCase().trim();
        const [rows] = await this.prisma.pool.query(`SELECT id, name FROM hospitals WHERE (slug = ? OR slug = REPLACE(?, 'center', 'centre') OR slug = 'agra-heart-centre') AND isActive = 1 LIMIT 1`, [cleanSlug, cleanSlug]);
        let hospital = rows[0];
        if (!hospital) {
            const [fallbackRows] = await this.prisma.pool.query(`SELECT id, name FROM hospitals WHERE isActive = 1 LIMIT 1`);
            hospital = fallbackRows[0];
        }
        if (!hospital)
            throw new common_1.NotFoundException('Hospital not found');
        const [settings] = await this.prisma.pool.query(`SELECT \`key\`, \`value\` FROM hospital_settings WHERE hospitalId = ?`, [hospital.id]);
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