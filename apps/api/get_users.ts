
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'hospital',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const users = await prisma.user.findMany({
    include: { userRoles: { include: { role: true } }, hospital: true }
  });
  console.log('--- All Users ---');
  for (const u of users) {
    const roles = u.userRoles.map(r => r.role.name).join(', ');
    const h = u.hospital?.name || 'No Hospital';
    console.log(u.email + ' | Roles: ' + roles + ' | isSuperAdmin: ' + u.isSuperAdmin + ' | Hospital: ' + h + ' (ID: ' + u.hospitalId + ')');
  }
}
main().catch(console.error).finally(()=>prisma.$disconnect());

