import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { randomUUID } from 'crypto';

function mapRow(row: any): any {
  if (!row || typeof row !== 'object') return row;
  if (row instanceof Date) return row;
  if (Array.isArray(row)) return row.map(mapRow);
  return { ...row };
}

export class ModelQueryBuilder {
  constructor(
    private pool: mysql.Pool,
    private tableName: string
  ) {}

  async findFirst(args: any = {}): Promise<any> {
    const list = await this.findMany({ ...args, take: 1 });
    return list[0] || null;
  }

  async findUnique(args: any = {}): Promise<any> {
    return this.findFirst(args);
  }

  async findMany(args: any = {}): Promise<any[]> {
    let sql = `SELECT * FROM \`${this.tableName}\``;
    const params: any[] = [];
    const whereClauses: string[] = [];

    if (args.where) {
      for (const [key, val] of Object.entries(args.where)) {
        if (val === undefined) continue;

        if (key === 'OR' && Array.isArray(val)) {
          const orParts: string[] = [];
          for (const item of val) {
            if (!item || typeof item !== 'object') continue;
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
          const v: any = val;
          if ('gte' in v || 'lte' in v || 'lt' in v || 'gt' in v) {
            if (v.gte !== undefined) { whereClauses.push(`\`${key}\` >= ?`); params.push(v.gte); }
            if (v.lte !== undefined) { whereClauses.push(`\`${key}\` <= ?`); params.push(v.lte); }
            if (v.gt !== undefined) { whereClauses.push(`\`${key}\` > ?`); params.push(v.gt); }
            if (v.lt !== undefined) { whereClauses.push(`\`${key}\` < ?`); params.push(v.lt); }
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
        } else {
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
      const orderParts = orderEntries.map((o: any) => {
        const [col, dir] = Object.entries(o)[0];
        return `\`${col}\` ${String(dir).toUpperCase()}`;
      });
      sql += ` ORDER BY ` + orderParts.join(', ');
    }

    if (args.take) {
      sql += ` LIMIT ${parseInt(args.take, 10)}`;
    }

    const [rows] = await this.pool.query(sql, params);
    const mapped = (rows as any[]).map(mapRow);

    if (args.include) {
      for (const item of mapped) {
        if (args.include.patient && item.patientId) {
          const [pRows] = await this.pool.query('SELECT * FROM `patients` WHERE id = ? LIMIT 1', [item.patientId]);
          item.patient = (pRows as any[])[0] ? mapRow((pRows as any[])[0]) : null;
        }
        if (args.include.queue && item.queueId) {
          const [qRows] = await this.pool.query('SELECT * FROM `queues` WHERE id = ? LIMIT 1', [item.queueId]);
          item.queue = (qRows as any[])[0] ? mapRow((qRows as any[])[0]) : null;
        }
        if (args.include.doctor && item.doctorId) {
          const [dRows] = await this.pool.query('SELECT * FROM `doctors` WHERE id = ? LIMIT 1', [item.doctorId]);
          item.doctor = (dRows as any[])[0] ? mapRow((dRows as any[])[0]) : null;
        }
        if (args.include.hospital && item.hospitalId) {
          const [hRows] = await this.pool.query('SELECT * FROM `hospitals` WHERE id = ? LIMIT 1', [item.hospitalId]);
          item.hospital = (hRows as any[])[0] ? mapRow((hRows as any[])[0]) : null;
        }
        if (args.include.user && item.userId) {
          const [uRows] = await this.pool.query('SELECT * FROM `users` WHERE id = ? LIMIT 1', [item.userId]);
          item.user = (uRows as any[])[0] ? mapRow((uRows as any[])[0]) : null;
        }
      }
    }

    return mapped;
  }

  async create(args: any): Promise<any> {
    const data = args.data || {};
    if (!data.id) {
      data.id = randomUUID();
    }
    const cols: string[] = [];
    const placeholders: string[] = [];
    const vals: any[] = [];

    for (const [key, val] of Object.entries(data)) {
      cols.push(`\`${key}\``);
      placeholders.push('?');
      vals.push(val);
    }

    const sql = `INSERT INTO \`${this.tableName}\` (${cols.join(', ')}) VALUES (${placeholders.join(', ')})`;
    await this.pool.execute(sql, vals);
    return this.findUnique({ where: { id: data.id } });
  }

  async createMany(args: any): Promise<any> {
    const items = args.data || [];
    for (const item of items) {
      await this.create({ data: item });
    }
    return { count: items.length };
  }

  async update(args: any): Promise<any> {
    const data = args.data || {};
    const setClauses: string[] = [];
    const vals: any[] = [];

    for (const [key, val] of Object.entries(data)) {
      setClauses.push(`\`${key}\` = ?`);
      vals.push(val);
    }

    let sql = `UPDATE \`${this.tableName}\` SET ${setClauses.join(', ')}`;
    const whereClauses: string[] = [];
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

  async updateMany(args: any): Promise<any> {
    const data = args.data || {};
    const setClauses: string[] = [];
    const vals: any[] = [];

    for (const [key, val] of Object.entries(data)) {
      setClauses.push(`\`${key}\` = ?`);
      vals.push(val);
    }

    let sql = `UPDATE \`${this.tableName}\` SET ${setClauses.join(', ')}`;
    const whereClauses: string[] = [];
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
    return { count: (res as any).affectedRows || 0 };
  }

  async upsert(args: any): Promise<any> {
    const existing = await this.findFirst({ where: args.where });
    if (existing) {
      return this.update({ where: args.where, data: args.update });
    } else {
      return this.create({ data: { ...args.where, ...args.create } });
    }
  }

  async delete(args: any): Promise<any> {
    const existing = await this.findUnique(args);
    let sql = `DELETE FROM \`${this.tableName}\``;
    const vals: any[] = [];
    const whereClauses: string[] = [];
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

  async deleteMany(args: any = {}): Promise<any> {
    let sql = `DELETE FROM \`${this.tableName}\``;
    const vals: any[] = [];
    const whereClauses: string[] = [];
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
    return { count: (res as any).affectedRows || 0 };
  }

  async count(args: any = {}): Promise<number> {
    let sql = `SELECT COUNT(*) as count FROM \`${this.tableName}\``;
    const params: any[] = [];
    const whereClauses: string[] = [];

    if (args.where) {
      for (const [key, val] of Object.entries(args.where)) {
        if (val === undefined) continue;
        whereClauses.push(`\`${key}\` = ?`);
        params.push(val);
      }
    }

    if (whereClauses.length > 0) {
      sql += ` WHERE ` + whereClauses.join(' AND ');
    }

    const [rows] = await this.pool.query(sql, params);
    return Number((rows as any[])[0]?.count || 0);
  }

  async aggregate(args: any = {}): Promise<any> {
    let sql = `SELECT MAX(\`tokenNumber\`) as maxTokenNumber FROM \`${this.tableName}\``;
    const params: any[] = [];
    const whereClauses: string[] = [];

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
    const maxVal = (rows as any[])[0]?.maxTokenNumber || 0;
    return { _max: { tokenNumber: maxVal } };
  }

  async groupBy(args: any = {}): Promise<any[]> {
    const byCols = args.by || [];
    let sql = `SELECT ${byCols.map((c: string) => `\`${c}\``).join(', ')}, COUNT(*) as _count FROM \`${this.tableName}\``;
    sql += ` GROUP BY ` + byCols.map((c: string) => `\`${c}\``).join(', ');
    const [rows] = await this.pool.query(sql);
    return (rows as any[]).map(mapRow);
  }
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public pool!: mysql.Pool;

  public hospital!: ModelQueryBuilder;
  public doctor!: ModelQueryBuilder;
  public department!: ModelQueryBuilder;
  public appointment!: ModelQueryBuilder;
  public queue!: ModelQueryBuilder;
  public queueToken!: ModelQueryBuilder;
  public user!: ModelQueryBuilder;
  public role!: ModelQueryBuilder;
  public patient!: ModelQueryBuilder;
  public medicalRecord!: ModelQueryBuilder;
  public labTest!: ModelQueryBuilder;
  public labReport!: ModelQueryBuilder;
  public medicine!: ModelQueryBuilder;
  public staff!: ModelQueryBuilder;
  public cmsPage!: ModelQueryBuilder;
  public blog!: ModelQueryBuilder;
  public faq!: ModelQueryBuilder;
  public testimonial!: ModelQueryBuilder;
  public gallery!: ModelQueryBuilder;
  public contactMessage!: ModelQueryBuilder;
  public notification!: ModelQueryBuilder;
  public invoice!: ModelQueryBuilder;
  public doctorSchedule!: ModelQueryBuilder;
  public doctorVacation!: ModelQueryBuilder;
  public hospitalSetting!: ModelQueryBuilder;
  public prescription!: ModelQueryBuilder;
  public rolePermission!: ModelQueryBuilder;
  public permission!: ModelQueryBuilder;
  public attendance!: ModelQueryBuilder;
  public leave!: ModelQueryBuilder;
  public userRole!: ModelQueryBuilder;
  public payment!: ModelQueryBuilder;

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
    } catch (err) {
      console.error('MySQL2 connection error:', err);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async $queryRaw(query: any, ...values: any[]): Promise<any> {
    let sql = typeof query === 'string' ? query : query.sql || query.text;
    const [rows] = await this.pool.query(sql, values);
    return rows;
  }

  async $executeRaw(query: any, ...values: any[]): Promise<any> {
    let sql = typeof query === 'string' ? query : query.sql || query.text;
    const [result] = await this.pool.execute(sql, values);
    return result;
  }

  async $transaction(cbOrList: any): Promise<any> {
    if (typeof cbOrList === 'function') {
      return cbOrList(this);
    }
    if (Array.isArray(cbOrList)) {
      const res: any[] = [];
      for (const p of cbOrList) {
        res.push(await p);
      }
      return res;
    }
    return null;
  }
}
