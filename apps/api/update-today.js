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
  
  // Get 10 appointments for this doctor
  const appointmentsToUpdate = await prisma.appointment.findMany({
    where: { doctorId: doc.id },
    take: 10
  });

  console.log(`Found ${appointmentsToUpdate.length} appointments to update.`);

  const today = new Date();
  
  // Update them to today
  let count = 0;
  for (const appt of appointmentsToUpdate) {
    const newDate = new Date(today);
    // Add random hours to today between 9 AM and 5 PM
    newDate.setHours(9 + count, 0, 0, 0);
    
    await prisma.appointment.update({
      where: { id: appt.id },
      data: { 
        appointmentDate: newDate,
        status: 'scheduled'
      }
    });
    count++;
  }
  
  console.log(`Successfully updated ${count} appointments to today for ${email}.`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
