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
  const doc = await prisma.doctor.findUnique({where: {email: 'dr.crrawat@agraheartcentre.com'}});
  if (!doc) {
    console.log('Doctor not found');
    return;
  }
  const appointmentsCount = await prisma.appointment.count({where: {doctorId: doc.id}});
  const patientsCount = await prisma.patient.count({where: { appointments: { some: { doctorId: doc.id } } }});
  
  console.log('Total appointments:', appointmentsCount);
  console.log('Total patients for doctor:', patientsCount);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
