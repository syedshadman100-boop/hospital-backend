
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaMariaDb({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'hospital',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  const role = await prisma.role.findUnique({ where: { name: 'Doctor' } });
  
  // 1. Create Dr Rajat Rawat User
  const rajatDoc = await prisma.doctor.findFirst({ where: { email: 'dr.rajatrawat@agraheartcentre.com' } });
  if (rajatDoc && !rajatDoc.userId) {
    const user = await prisma.user.create({
      data: {
        email: 'dr.rajatrawat@agraheartcentre.com',
        password: hashedPassword,
        firstName: rajatDoc.firstName,
        lastName: rajatDoc.lastName,
        hospitalId: rajatDoc.hospitalId,
      }
    });
    if (role) {
      await prisma.userRole.create({
        data: { userId: user.id, roleId: role.id }
      });
    }
    await prisma.doctor.update({
      where: { id: rajatDoc.id },
      data: { userId: user.id }
    });
    console.log('Created user for Dr. Rajat Rawat');
  }

  // 2. Update emails for other doctors
  const allDocs = await prisma.doctor.findMany({ include: { user: true } });
  
  for (const doc of allDocs) {
    if (doc.email.includes('hospital.com') || doc.email.includes('citycare.com')) {
      const cleanFirst = doc.firstName.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const cleanLast = doc.lastName.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const newEmail = 'dr.' + cleanFirst + cleanLast + '@agraheartcentre.com';
      
      try {
        if (doc.user) {
          await prisma.user.update({
            where: { id: doc.user.id },
            data: { email: newEmail }
          });
        }
        
        await prisma.doctor.update({
          where: { id: doc.id },
          data: { email: newEmail }
        });
        console.log('Updated ' + doc.firstName + ' ' + doc.lastName + ' from ' + doc.email + ' to ' + newEmail);
      } catch (err) {
        console.error('Failed to update ' + doc.firstName + ' ' + doc.lastName + ': ', err.message);
      }
    }
  }
}
main().catch(console.error).finally(()=>prisma.$disconnect());

