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
exports.PrismaService = exports.ModelQueryBuilder = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
const crypto_1 = require("crypto");
function mapRow(row) {
    if (!row || typeof row !== 'object')
        return row;
    if (row instanceof Date)
        return row;
    if (Array.isArray(row))
        return row.map(mapRow);
    return { ...row };
}
class ModelQueryBuilder {
    constructor(pool, tableName) {
        this.pool = pool;
        this.tableName = tableName;
    }
    async findFirst(args = {}) {
        const list = await this.findMany({ ...args, take: 1 });
        return list[0] || null;
    }
    async findUnique(args = {}) {
        return this.findFirst(args);
    }
    async findMany(args = {}) {
        let sql = `SELECT * FROM \`${this.tableName}\``;
        const params = [];
        const whereClauses = [];
        if (args.where) {
            for (const [key, val] of Object.entries(args.where)) {
                if (val === undefined)
                    continue;
                if (key === 'OR' && Array.isArray(val)) {
                    const orParts = [];
                    for (const item of val) {
                        if (!item || typeof item !== 'object')
                            continue;
                        for (const [sKey, sVal] of Object.entries(item)) {
                            orParts.push(`\`${sKey}\` = ?`);
                            params.push(sVal);
                        }
                    }
                    if (orParts.length > 0) {
                        whereClauses.push(`(` + orParts.join(' OR ') + `)`);
                    }
                    continue;
                }
                if (typeof val === 'object' && val !== null && !Array.isArray(val) && !(val instanceof Date)) {
                    const v = val;
                    if ('gte' in v || 'lte' in v || 'lt' in v || 'gt' in v) {
                        if (v.gte !== undefined) {
                            whereClauses.push(`\`${key}\` >= ?`);
                            params.push(v.gte);
                        }
                        if (v.lte !== undefined) {
                            whereClauses.push(`\`${key}\` <= ?`);
                            params.push(v.lte);
                        }
                        if (v.gt !== undefined) {
                            whereClauses.push(`\`${key}\` > ?`);
                            params.push(v.gt);
                        }
                        if (v.lt !== undefined) {
                            whereClauses.push(`\`${key}\` < ?`);
                            params.push(v.lt);
                        }
                        continue;
                    }
                    for (const [subKey, subVal] of Object.entries(val)) {
                        whereClauses.push(`\`${subKey}\` = ?`);
                        params.push(subVal);
                    }
                    continue;
                }
                if (val === null) {
                    whereClauses.push(`\`${key}\` IS NULL`);
                }
                else {
                    whereClauses.push(`\`${key}\` = ?`);
                    params.push(val);
                }
            }
        }
        if (whereClauses.length > 0) {
            sql += ` WHERE ` + whereClauses.join(' AND ');
        }
        if (args.orderBy) {
            const orderEntries = Array.isArray(args.orderBy) ? args.orderBy : [args.orderBy];
            const orderParts = orderEntries.map((o) => {
                const [col, dir] = Object.entries(o)[0];
                return `\`${col}\` ${String(dir).toUpperCase()}`;
            });
            sql += ` ORDER BY ` + orderParts.join(', ');
        }
        if (args.take) {
            sql += ` LIMIT ${parseInt(args.take, 10)}`;
        }
        const [rows] = await this.pool.query(sql, params);
        const mapped = rows.map(mapRow);
        if (args.include) {
            for (const item of mapped) {
                if (args.include.patient && item.patientId) {
                    const [pRows] = await this.pool.query('SELECT * FROM `patients` WHERE id = ? LIMIT 1', [item.patientId]);
                    item.patient = pRows[0] ? mapRow(pRows[0]) : null;
                }
                if (args.include.queue && item.queueId) {
                    const [qRows] = await this.pool.query('SELECT * FROM `queues` WHERE id = ? LIMIT 1', [item.queueId]);
                    item.queue = qRows[0] ? mapRow(qRows[0]) : null;
                }
                if (args.include.doctor && item.doctorId) {
                    const [dRows] = await this.pool.query('SELECT * FROM `doctors` WHERE id = ? LIMIT 1', [item.doctorId]);
                    item.doctor = dRows[0] ? mapRow(dRows[0]) : null;
                }
                if (args.include.hospital && item.hospitalId) {
                    const [hRows] = await this.pool.query('SELECT * FROM `hospitals` WHERE id = ? LIMIT 1', [item.hospitalId]);
                    item.hospital = hRows[0] ? mapRow(hRows[0]) : null;
                }
                if (args.include.user && item.userId) {
                    const [uRows] = await this.pool.query('SELECT * FROM `users` WHERE id = ? LIMIT 1', [item.userId]);
                    item.user = uRows[0] ? mapRow(uRows[0]) : null;
                }
            }
        }
        return mapped;
    }
    async create(args) {
        const data = args.data || {};
        if (!data.id) {
            data.id = (0, crypto_1.randomUUID)();
        }
        const cols = [];
        const placeholders = [];
        const vals = [];
        for (const [key, val] of Object.entries(data)) {
            cols.push(`\`${key}\``);
            placeholders.push('?');
            vals.push(val);
        }
        const sql = `INSERT INTO \`${this.tableName}\` (${cols.join(', ')}) VALUES (${placeholders.join(', ')})`;
        await this.pool.execute(sql, vals);
        return this.findUnique({ where: { id: data.id } });
    }
    async createMany(args) {
        const items = args.data || [];
        for (const item of items) {
            await this.create({ data: item });
        }
        return { count: items.length };
    }
    async update(args) {
        const data = args.data || {};
        const setClauses = [];
        const vals = [];
        for (const [key, val] of Object.entries(data)) {
            setClauses.push(`\`${key}\` = ?`);
            vals.push(val);
        }
        let sql = `UPDATE \`${this.tableName}\` SET ${setClauses.join(', ')}`;
        const whereClauses = [];
        if (args.where) {
            for (const [key, val] of Object.entries(args.where)) {
                whereClauses.push(`\`${key}\` = ?`);
                vals.push(val);
            }
        }
        if (whereClauses.length > 0) {
            sql += ` WHERE ` + whereClauses.join(' AND ');
        }
        await this.pool.execute(sql, vals);
        return this.findUnique({ where: args.where });
    }
    async updateMany(args) {
        const data = args.data || {};
        const setClauses = [];
        const vals = [];
        for (const [key, val] of Object.entries(data)) {
            setClauses.push(`\`${key}\` = ?`);
            vals.push(val);
        }
        let sql = `UPDATE \`${this.tableName}\` SET ${setClauses.join(', ')}`;
        const whereClauses = [];
        if (args.where) {
            for (const [key, val] of Object.entries(args.where)) {
                whereClauses.push(`\`${key}\` = ?`);
                vals.push(val);
            }
        }
        if (whereClauses.length > 0) {
            sql += ` WHERE ` + whereClauses.join(' AND ');
        }
        const [res] = await this.pool.execute(sql, vals);
        return { count: res.affectedRows || 0 };
    }
    async upsert(args) {
        const existing = await this.findFirst({ where: args.where });
        if (existing) {
            return this.update({ where: args.where, data: args.update });
        }
        else {
            return this.create({ data: { ...args.where, ...args.create } });
        }
    }
    async delete(args) {
        const existing = await this.findUnique(args);
        let sql = `DELETE FROM \`${this.tableName}\``;
        const vals = [];
        const whereClauses = [];
        if (args.where) {
            for (const [key, val] of Object.entries(args.where)) {
                whereClauses.push(`\`${key}\` = ?`);
                vals.push(val);
            }
        }
        if (whereClauses.length > 0) {
            sql += ` WHERE ` + whereClauses.join(' AND ');
        }
        await this.pool.execute(sql, vals);
        return existing;
    }
    async deleteMany(args = {}) {
        let sql = `DELETE FROM \`${this.tableName}\``;
        const vals = [];
        const whereClauses = [];
        if (args.where) {
            for (const [key, val] of Object.entries(args.where)) {
                whereClauses.push(`\`${key}\` = ?`);
                vals.push(val);
            }
        }
        if (whereClauses.length > 0) {
            sql += ` WHERE ` + whereClauses.join(' AND ');
        }
        const [res] = await this.pool.execute(sql, vals);
        return { count: res.affectedRows || 0 };
    }
    async count(args = {}) {
        let sql = `SELECT COUNT(*) as count FROM \`${this.tableName}\``;
        const params = [];
        const whereClauses = [];
        if (args.where) {
            for (const [key, val] of Object.entries(args.where)) {
                if (val === undefined)
                    continue;
                whereClauses.push(`\`${key}\` = ?`);
                params.push(val);
            }
        }
        if (whereClauses.length > 0) {
            sql += ` WHERE ` + whereClauses.join(' AND ');
        }
        const [rows] = await this.pool.query(sql, params);
        return Number(rows[0]?.count || 0);
    }
    async aggregate(args = {}) {
        let sql = `SELECT MAX(\`tokenNumber\`) as maxTokenNumber FROM \`${this.tableName}\``;
        const params = [];
        const whereClauses = [];
        if (args.where) {
            for (const [key, val] of Object.entries(args.where)) {
                whereClauses.push(`\`${key}\` = ?`);
                params.push(val);
            }
        }
        if (whereClauses.length > 0) {
            sql += ` WHERE ` + whereClauses.join(' AND ');
        }
        const [rows] = await this.pool.query(sql, params);
        const maxVal = rows[0]?.maxTokenNumber || 0;
        return { _max: { tokenNumber: maxVal } };
    }
    async groupBy(args = {}) {
        const byCols = args.by || [];
        let sql = `SELECT ${byCols.map((c) => `\`${c}\``).join(', ')}, COUNT(*) as _count FROM \`${this.tableName}\``;
        sql += ` GROUP BY ` + byCols.map((c) => `\`${c}\``).join(', ');
        const [rows] = await this.pool.query(sql);
        return rows.map(mapRow);
    }
}
exports.ModelQueryBuilder = ModelQueryBuilder;
let PrismaService = class PrismaService {
    constructor() {
        this.pool = mysql.createPool({
            host: '127.0.0.1',
            port: 3306,
            user: process.env.DB_USER || 'u395083380_shajman',
            password: process.env.DB_PASSWORD || 'TheBrand@Bhai9045',
            database: process.env.DB_NAME || 'u395083380_hosptital',
            waitForConnections: true,
            connectionLimit: 20,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            dateStrings: true,
        });
        this.hospital = new ModelQueryBuilder(this.pool, 'hospitals');
        this.doctor = new ModelQueryBuilder(this.pool, 'doctors');
        this.department = new ModelQueryBuilder(this.pool, 'departments');
        this.appointment = new ModelQueryBuilder(this.pool, 'appointments');
        this.queue = new ModelQueryBuilder(this.pool, 'queues');
        this.queueToken = new ModelQueryBuilder(this.pool, 'queue_tokens');
        this.user = new ModelQueryBuilder(this.pool, 'users');
        this.role = new ModelQueryBuilder(this.pool, 'roles');
        this.patient = new ModelQueryBuilder(this.pool, 'patients');
        this.medicalRecord = new ModelQueryBuilder(this.pool, 'medical_records');
        this.labTest = new ModelQueryBuilder(this.pool, 'lab_tests');
        this.labReport = new ModelQueryBuilder(this.pool, 'lab_reports');
        this.medicine = new ModelQueryBuilder(this.pool, 'medicines');
        this.staff = new ModelQueryBuilder(this.pool, 'staff');
        this.cmsPage = new ModelQueryBuilder(this.pool, 'cms_pages');
        this.blog = new ModelQueryBuilder(this.pool, 'blogs');
        this.faq = new ModelQueryBuilder(this.pool, 'faqs');
        this.testimonial = new ModelQueryBuilder(this.pool, 'testimonials');
        this.gallery = new ModelQueryBuilder(this.pool, 'gallery');
        this.contactMessage = new ModelQueryBuilder(this.pool, 'contact_messages');
        this.notification = new ModelQueryBuilder(this.pool, 'notifications');
        this.invoice = new ModelQueryBuilder(this.pool, 'invoices');
        this.doctorSchedule = new ModelQueryBuilder(this.pool, 'doctor_schedules');
        this.doctorVacation = new ModelQueryBuilder(this.pool, 'doctor_vacations');
        this.hospitalSetting = new ModelQueryBuilder(this.pool, 'hospital_settings');
        this.prescription = new ModelQueryBuilder(this.pool, 'prescriptions');
        this.rolePermission = new ModelQueryBuilder(this.pool, 'role_permissions');
        this.permission = new ModelQueryBuilder(this.pool, 'permissions');
        this.attendance = new ModelQueryBuilder(this.pool, 'attendance');
        this.leave = new ModelQueryBuilder(this.pool, 'leaves');
        this.userRole = new ModelQueryBuilder(this.pool, 'user_roles');
        this.payment = new ModelQueryBuilder(this.pool, 'payments');
    }
    async onModuleInit() {
        try {
            const [rows] = await this.pool.query('SELECT 1');
            console.log('MySQL2 pool connected successfully!');
        }
        catch (err) {
            console.error('MySQL2 connection error:', err);
        }
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
    async $queryRaw(query, ...values) {
        let sql = typeof query === 'string' ? query : query.sql || query.text;
        const [rows] = await this.pool.query(sql, values);
        return rows;
    }
    async $executeRaw(query, ...values) {
        let sql = typeof query === 'string' ? query : query.sql || query.text;
        const [result] = await this.pool.execute(sql, values);
        return result;
    }
    async $transaction(cbOrList) {
        if (typeof cbOrList === 'function') {
            return cbOrList(this);
        }
        if (Array.isArray(cbOrList)) {
            const res = [];
            for (const p of cbOrList) {
                res.push(await p);
            }
            return res;
        }
        return null;
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map