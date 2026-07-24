
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
  const hospitals = await prisma.hospital.findMany();
  console.log(hospitals.map(h => h.id + ' | ' + h.slug + ' | ' + h.name));
}
main().catch(console.error).finally(()=>prisma.$disconnect());

