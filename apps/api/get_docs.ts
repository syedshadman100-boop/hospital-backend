
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
  const docs = await prisma.doctor.findMany({
    include: { hospital: true, user: true }
  });
  console.log('--- All Doctors ---');
  for (const d of docs) {
    console.log(d.firstName + ' ' + d.lastName + ' | ' + d.email + ' | Hosp: ' + d.hospital?.name + ' (ID: ' + d.hospitalId + ') | User: ' + d.userId);
  }
}
main().catch(console.error).finally(()=>prisma.$disconnect());

