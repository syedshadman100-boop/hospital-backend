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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let StaffService = class StaffService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(hospitalId, filters) {
        const { department, shift, isActive, search, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {
            hospitalId,
            ...(department && { department }),
            ...(shift && { shift }),
            ...(isActive !== undefined && { isActive }),
            ...(search && {
                OR: [
                    { firstName: { contains: search } },
                    { lastName: { contains: search } },
                    { email: { contains: search } },
                    { employeeId: { contains: search } },
                    { designation: { contains: search } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.staff.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: { select: { attendance: true, leaves: true } },
                },
            }),
            this.prisma.staff.count({ where }),
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
        const staff = await this.prisma.staff.findUnique({
            where: { id },
            include: {
                attendance: {
                    orderBy: { date: 'desc' },
                    take: 30,
                },
                leaves: {
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                },
            },
        });
        if (!staff)
            throw new common_1.NotFoundException('Staff not found');
        return staff;
    }
    async create(dto, hospitalId) {
        if (dto.email) {
            const existing = await this.prisma.staff.findFirst({
                where: { email: dto.email, hospitalId },
            });
            if (existing) {
                throw new common_1.ConflictException('A staff member with this email already exists in this hospital');
            }
        }
        const employeeId = await this.generateEmployeeId(hospitalId);
        return this.prisma.staff.create({
            data: {
                hospitalId,
                employeeId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                phone: dto.phone,
                gender: dto.gender,
                dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
                department: dto.department,
                designation: dto.designation,
                joinDate: dto.joinDate ? new Date(dto.joinDate) : null,
                salary: dto.salary,
                shift: dto.shift,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.email) {
            const existing = await this.prisma.staff.findFirst({
                where: { email: dto.email, id: { not: id } },
            });
            if (existing) {
                throw new common_1.ConflictException('A staff member with this email already exists');
            }
        }
        const updateData = { ...dto };
        if (dto.dateOfBirth) {
            updateData.dateOfBirth = new Date(dto.dateOfBirth);
        }
        if (dto.joinDate) {
            updateData.joinDate = new Date(dto.joinDate);
        }
        return this.prisma.staff.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.staff.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async markAttendance(staffId, date, checkIn, checkOut, status) {
        await this.findOne(staffId);
        const attendanceDate = new Date(date);
        if (isNaN(attendanceDate.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        return this.prisma.attendance.upsert({
            where: {
                staffId_date: { staffId, date: attendanceDate },
            },
            update: {
                ...(checkIn && { checkIn: new Date(checkIn) }),
                ...(checkOut && { checkOut: new Date(checkOut) }),
                ...(status && { status }),
            },
            create: {
                staffId,
                date: attendanceDate,
                checkIn: checkIn ? new Date(checkIn) : null,
                checkOut: checkOut ? new Date(checkOut) : null,
                status: status || 'present',
            },
        });
    }
    async getAttendance(staffId, startDate, endDate) {
        await this.findOne(staffId);
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        return this.prisma.attendance.findMany({
            where: {
                staffId,
                date: { gte: start, lte: end },
            },
            orderBy: { date: 'asc' },
        });
    }
    async applyLeave(staffId, type, startDate, endDate, reason) {
        await this.findOne(staffId);
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        if (end < start) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        return this.prisma.leave.create({
            data: {
                staffId,
                type,
                startDate: start,
                endDate: end,
                reason,
            },
        });
    }
    async getLeaves(staffId, status) {
        await this.findOne(staffId);
        return this.prisma.leave.findMany({
            where: {
                staffId,
                ...(status && { status }),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async generateEmployeeId(hospitalId) {
        const lastStaff = await this.prisma.staff.findFirst({
            where: { hospitalId },
            orderBy: { createdAt: 'desc' },
            select: { employeeId: true },
        });
        if (!lastStaff) {
            return 'EMP-001';
        }
        const lastNumber = parseInt(lastStaff.employeeId.replace('EMP-', ''), 10);
        const nextNumber = lastNumber + 1;
        return `EMP-${String(nextNumber).padStart(3, '0')}`;
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map