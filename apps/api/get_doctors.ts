
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
  const doctors = await prisma.doctor.findMany({
    where: { hospitalId: '860efd5e-819c-11f1-b3b6-d8bbc1ce0644' },
    include: { user: true }
  });
  console.log('--- Agra Heart Centre Doctors ---');
  console.log(doctors.map(d => d.email + ' | UserId: ' + d.userId));
  
  const staff = await prisma.staff.findMany({
    where: { hospitalId: '860efd5e-819c-11f1-b3b6-d8bbc1ce0644' }
  });
  console.log('--- Agra Heart Centre Staff ---');
  console.log(staff.map(s => s.email + ' | UserId: ' + s.userId));
}
main().catch(console.error).finally(()=>prisma.$disconnect());

