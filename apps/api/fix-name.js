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

Promise.all([
  prisma.user.update({
    where: {email: 'dr.crrawat@agraheartcentre.com'}, 
    data: {firstName: 'C.R.', lastName: 'Rawat'}
  }),
  prisma.doctor.update({
    where: {email: 'dr.crrawat@agraheartcentre.com'}, 
    data: {firstName: 'C.R.', lastName: 'Rawat'}
  })
])
.then(() => console.log('Updated user and doctor profile names to C.R. Rawat!'))
.catch(e => console.error(e))
.finally(() => prisma.$disconnect());
