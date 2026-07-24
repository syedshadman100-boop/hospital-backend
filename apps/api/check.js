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
prisma.user.findUnique({where: {email: 'dr.crrawat@agraheartcentre.com'}})
  .then(u => console.log(u))
  .finally(() => prisma.$disconnect());
