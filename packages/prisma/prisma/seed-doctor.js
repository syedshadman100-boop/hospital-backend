"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, '../../../.env') });
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});
async function main() {
    console.log('Generating 30 dummy patients and appointments for dr.crrawat@agraheartcentre.com...');
    const hospital = await prisma.hospital.findFirst({ where: { isActive: true } });
    if (!hospital) {
        console.error('No active hospital found!');
        process.exit(1);
    }
    // Find or create doctor dr.crrawat@agraheartcentre.com
    const email = 'dr.crrawat@agraheartcentre.com';
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.log(`Creating user for ${email}...`);
        const hashedPassword = await bcrypt.hash('Admin@123', 12);
        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: 'C.R.',
                lastName: 'Rawat',
                hospitalId: hospital.id,
            },
        });
        const docRole = await prisma.role.findUnique({ where: { name: 'Doctor' } });
        if (docRole) {
            await prisma.userRole.create({
                data: { userId: user.id, roleId: docRole.id },
            });
        }
    }
    // Check if doctor profile exists
    let doctor = await prisma.doctor.findUnique({ where: { email } });
    if (!doctor) {
        console.log('Creating doctor profile...');
        const cardiologyDept = await prisma.department.findFirst({ where: { name: 'Cardiology', hospitalId: hospital.id } });
        if (!cardiologyDept) {
            console.error('Cardiology department not found. Run standard seed first.');
            process.exit(1);
        }
        doctor = await prisma.doctor.create({
            data: {
                hospitalId: hospital.id,
                departmentId: cardiologyDept.id,
                userId: user.id,
                firstName: 'C.R.',
                lastName: 'Rawat',
                email: email,
                phone: '9876543219',
                specialization: 'Interventional Cardiology',
                qualification: 'MD, DM Cardiology',
                experience: 40,
                consultationFee: 1500,
                isAvailable: true,
            },
        });
        // Add schedule
        for (let day = 1; day <= 6; day++) {
            await prisma.doctorSchedule.create({
                data: {
                    doctorId: doctor.id,
                    dayOfWeek: day,
                    startTime: '09:00',
                    endTime: '17:00',
                    slotDuration: 30,
                },
            });
        }
    }
    console.log('Generating 30 dummy patients & appointments...');
    const firstNames = ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Arjun', 'Siddharth', 'Rohan', 'Dhruv', 'Kabir', 'Shaurya', 'Ananya', 'Diya', 'Suhani', 'Riya', 'Kavya', 'Sneha', 'Meera', 'Pooja', 'Neha', 'Kiara'];
    const lastNames = ['Sharma', 'Verma', 'Singh', 'Patel', 'Kumar', 'Gupta', 'Rao', 'Reddy', 'Joshi', 'Tiwari', 'Agarwal', 'Mishra', 'Deshmukh', 'Yadav', 'Chauhan'];
    const statuses = ['scheduled', 'confirmed', 'completed', 'completed', 'completed', 'no_show', 'cancelled'];
    for (let i = 0; i < 30; i++) {
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const patientEmail = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@youmail`;
        const phone = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
        const patient = await prisma.patient.create({
            data: {
                hospitalId: hospital.id,
                firstName: fn,
                lastName: ln,
                email: patientEmail,
                phone,
                gender: Math.random() > 0.5 ? 'Male' : 'Female',
                dateOfBirth: new Date(1950 + Math.floor(Math.random() * 50), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            },
        });
        // Generate date between -15 days to +15 days
        const offsetDays = Math.floor(Math.random() * 31) - 15;
        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() + offsetDays);
        appointmentDate.setHours(0, 0, 0, 0);
        // Choose time slot
        const hour = 9 + Math.floor(Math.random() * 8);
        const min = Math.random() > 0.5 ? '00' : '30';
        const startTime = `${String(hour).padStart(2, '0')}:${min}`;
        const endTime = `${String(hour).padStart(2, '0')}:${min === '00' ? '30' : '00'}`; // Approximate
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        // Force past appointments to be completed/no_show, future to be scheduled/confirmed
        if (offsetDays < 0) {
            status = Math.random() > 0.8 ? 'no_show' : 'completed';
        }
        else if (offsetDays > 0) {
            status = Math.random() > 0.5 ? 'scheduled' : 'confirmed';
        }
        else {
            // today
            status = 'scheduled';
        }
        await prisma.appointment.create({
            data: {
                hospitalId: hospital.id,
                patientId: patient.id,
                doctorId: doctor.id,
                appointmentDate,
                startTime,
                endTime,
                status,
                consultationType: 'offline',
                reason: 'Routine checkup / Heart palpitations',
            },
        });
    }
    console.log('Successfully created 30 patients and appointments!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
