require('dotenv').config({path: '../../.env'});
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || '127.0.0.1', 
  port: 3306, 
  user: 'root', 
  password: '', 
  database: 'hospital'
});
const prisma = new PrismaClient({adapter});

async function run() {
  const email = 'dr.crrawat@agraheartcentre.com';
  const doc = await prisma.doctor.findUnique({where: {email}});
  if (!doc) {
    console.log('Doctor not found');
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Get or create Queue for today
  let queue = await prisma.queue.findUnique({
    where: { doctorId_date: { doctorId: doc.id, date: today } }
  });

  if (!queue) {
    queue = await prisma.queue.create({
      data: {
        hospitalId: doc.hospitalId,
        doctorId: doc.id,
        date: today
      }
    });
    console.log('Created new queue for today:', queue.id);
  } else {
    console.log('Found existing queue for today:', queue.id);
  }

  // 2. Find appointments for today that don't have a queue token
  const todayApps = await prisma.appointment.findMany({
    where: {
      doctorId: doc.id,
      appointmentDate: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      queueTokenId: null
    },
    orderBy: {
      appointmentDate: 'asc'
    }
  });

  console.log(`Found ${todayApps.length} appointments for today without queue tokens.`);

  // 3. Create queue tokens for them
  let tokenCount = 1;
  for (const app of todayApps) {
    const queueToken = await prisma.queueToken.create({
      data: {
        queueId: queue.id,
        patientId: app.patientId,
        appointmentId: app.id,
        tokenNumber: tokenCount,
        status: 'waiting',
        priority: 'normal'
      }
    });
    
    await prisma.appointment.update({
      where: { id: app.id },
      data: { queueTokenId: queueToken.id }
    });
    
    tokenCount++;
  }
  
  console.log(`Successfully created ${tokenCount - 1} queue tokens.`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
