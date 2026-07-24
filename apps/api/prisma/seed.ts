import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaMariaDb({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '',
  database: 'hospital',
});

const prisma = new PrismaClient({ adapter });

const PERMISSIONS = [
  // Hospitals
  { name: 'hospitals.view', module: 'hospitals', action: 'view' },
  { name: 'hospitals.create', module: 'hospitals', action: 'create' },
  { name: 'hospitals.update', module: 'hospitals', action: 'update' },
  { name: 'hospitals.delete', module: 'hospitals', action: 'delete' },
  // Departments
  { name: 'departments.view', module: 'departments', action: 'view' },
  { name: 'departments.create', module: 'departments', action: 'create' },
  { name: 'departments.update', module: 'departments', action: 'update' },
  { name: 'departments.delete', module: 'departments', action: 'delete' },
  // Doctors
  { name: 'doctors.view', module: 'doctors', action: 'view' },
  { name: 'doctors.create', module: 'doctors', action: 'create' },
  { name: 'doctors.update', module: 'doctors', action: 'update' },
  { name: 'doctors.delete', module: 'doctors', action: 'delete' },
  // Patients
  { name: 'patients.view', module: 'patients', action: 'view' },
  { name: 'patients.create', module: 'patients', action: 'create' },
  { name: 'patients.update', module: 'patients', action: 'update' },
  { name: 'patients.delete', module: 'patients', action: 'delete' },
  // Appointments
  { name: 'appointments.view', module: 'appointments', action: 'view' },
  { name: 'appointments.create', module: 'appointments', action: 'create' },
  { name: 'appointments.update', module: 'appointments', action: 'update' },
  { name: 'appointments.cancel', module: 'appointments', action: 'cancel' },
  // Billing
  { name: 'billing.view', module: 'billing', action: 'view' },
  { name: 'billing.create', module: 'billing', action: 'create' },
  { name: 'billing.update', module: 'billing', action: 'update' },
  { name: 'billing.refund', module: 'billing', action: 'refund' },
  // Queue
  { name: 'queue.view', module: 'queue', action: 'view' },
  { name: 'queue.manage', module: 'queue', action: 'manage' },
  // Medical Records
  { name: 'medical_records.view', module: 'medical_records', action: 'view' },
  { name: 'medical_records.create', module: 'medical_records', action: 'create' },
  { name: 'medical_records.update', module: 'medical_records', action: 'update' },
  // Lab
  { name: 'lab.view', module: 'lab', action: 'view' },
  { name: 'lab.create', module: 'lab', action: 'create' },
  { name: 'lab.update', module: 'lab', action: 'update' },
  // Pharmacy
  { name: 'pharmacy.view', module: 'pharmacy', action: 'view' },
  { name: 'pharmacy.create', module: 'pharmacy', action: 'create' },
  { name: 'pharmacy.update', module: 'pharmacy', action: 'update' },
  { name: 'pharmacy.delete', module: 'pharmacy', action: 'delete' },
  // Staff
  { name: 'staff.view', module: 'staff', action: 'view' },
  { name: 'staff.create', module: 'staff', action: 'create' },
  { name: 'staff.update', module: 'staff', action: 'update' },
  { name: 'staff.delete', module: 'staff', action: 'delete' },
  // CMS
  { name: 'cms.view', module: 'cms', action: 'view' },
  { name: 'cms.create', module: 'cms', action: 'create' },
  { name: 'cms.update', module: 'cms', action: 'update' },
  { name: 'cms.delete', module: 'cms', action: 'delete' },
  // Roles
  { name: 'roles.view', module: 'roles', action: 'view' },
  { name: 'roles.manage', module: 'roles', action: 'manage' },
  // Users
  { name: 'users.view', module: 'users', action: 'view' },
  { name: 'users.create', module: 'users', action: 'create' },
  { name: 'users.update', module: 'users', action: 'update' },
  { name: 'users.delete', module: 'users', action: 'delete' },
  // Notifications
  { name: 'notifications.view', module: 'notifications', action: 'view' },
  { name: 'notifications.send', module: 'notifications', action: 'send' },
  // Reports
  { name: 'reports.view', module: 'reports', action: 'view' },
  { name: 'reports.export', module: 'reports', action: 'export' },
];

const ROLES = [
  { name: 'Super Admin', description: 'Full system access', isSystem: true },
  { name: 'Hospital Admin', description: 'Hospital-level administration', isSystem: true },
  { name: 'Doctor', description: 'Medical professional', isSystem: true },
  { name: 'Nurse', description: 'Nursing staff', isSystem: true },
  { name: 'Receptionist', description: 'Front desk operations', isSystem: true },
  { name: 'Pharmacist', description: 'Pharmacy operations', isSystem: true },
  { name: 'Lab Technician', description: 'Laboratory operations', isSystem: true },
  { name: 'Cashier', description: 'Payment processing', isSystem: true },
  { name: 'Attender', description: 'Patient assistance', isSystem: true },
  { name: 'Patient', description: 'Patient portal access', isSystem: true },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  'Super Admin': PERMISSIONS.map((p) => p.name),
  'Hospital Admin': [
    'hospitals.view', 'departments.view', 'departments.create', 'departments.update',
    'doctors.view', 'doctors.create', 'doctors.update', 'doctors.delete',
    'patients.view', 'patients.create', 'patients.update',
    'appointments.view', 'appointments.create', 'appointments.update', 'appointments.cancel',
    'billing.view', 'billing.create', 'billing.update', 'billing.refund',
    'queue.view', 'queue.manage',
    'medical_records.view', 'medical_records.create',
    'lab.view', 'lab.create', 'lab.update',
    'pharmacy.view', 'pharmacy.create', 'pharmacy.update',
    'staff.view', 'staff.create', 'staff.update', 'staff.delete',
    'cms.view', 'cms.create', 'cms.update', 'cms.delete',
    'notifications.view', 'notifications.send',
    'reports.view', 'reports.export',
    'users.view', 'users.create', 'users.update',
    'roles.view',
  ],
  Doctor: [
    'patients.view', 'appointments.view', 'appointments.update',
    'medical_records.view', 'medical_records.create', 'medical_records.update',
    'lab.view', 'queue.view',
    'notifications.view',
  ],
  Nurse: [
    'patients.view', 'medical_records.view', 'medical_records.create',
    'queue.view', 'lab.view', 'notifications.view',
  ],
  Receptionist: [
    'patients.view', 'patients.create', 'patients.update',
    'appointments.view', 'appointments.create', 'appointments.update', 'appointments.cancel',
    'billing.view', 'billing.create',
    'queue.view', 'queue.manage', 'doctors.view',
    'notifications.view',
  ],
  Pharmacist: ['pharmacy.view', 'pharmacy.create', 'pharmacy.update', 'pharmacy.delete', 'notifications.view'],
  'Lab Technician': ['lab.view', 'lab.create', 'lab.update', 'medical_records.view', 'notifications.view'],
  Cashier: ['billing.view', 'billing.create', 'billing.refund', 'notifications.view'],
  Attender: ['patients.view', 'queue.view', 'notifications.view'],
  Patient: ['appointments.view', 'appointments.create', 'medical_records.view', 'notifications.view'],
};

const DEPARTMENTS = [
  { name: 'Cardiology', description: 'Heart and cardiovascular system care' },
  { name: 'Neurology', description: 'Brain and nervous system care' },
  { name: 'Orthopedics', description: 'Bone, joint, and muscle care' },
  { name: 'Pediatrics', description: 'Medical care for infants, children, and adolescents' },
  { name: 'Dermatology', description: 'Skin, hair, and nail conditions' },
  { name: 'Ophthalmology', description: 'Eye care and vision treatment' },
  { name: 'ENT', description: 'Ear, nose, and throat conditions' },
  { name: 'General Medicine', description: 'Primary healthcare and general conditions' },
  { name: 'General Surgery', description: 'Surgical procedures' },
  { name: 'Gynecology', description: 'Female reproductive health care' },
  { name: 'Urology', description: 'Urinary tract and male reproductive system' },
  { name: 'Psychiatry', description: 'Mental health and behavioral disorders' },
];

const SAMPLE_DOCTORS = [
  { firstName: 'C.R.', lastName: 'Rawat', email: 'dr.rawat@hospital.com', specialization: 'Interventional Cardiology', experience: 40, qualification: 'MD, DM Cardiology', consultationFee: 1500, gender: 'Male', languages: 'English, Hindi' },
  { firstName: 'Priya', lastName: 'Patel', email: 'dr.priya@hospital.com', specialization: 'Clinical Neurology', experience: 12, qualification: 'MD, DM Neurology', consultationFee: 1200, gender: 'Female', languages: 'English, Hindi, Gujarati' },
  { firstName: 'Arun', lastName: 'Kumar', email: 'dr.arun@hospital.com', specialization: 'Joint Replacement', experience: 15, qualification: 'MS Orthopedics, Fellowship', consultationFee: 1000, gender: 'Male', languages: 'English, Hindi, Tamil' },
  { firstName: 'Sneha', lastName: 'Reddy', email: 'dr.sneha@hospital.com', specialization: 'Pediatric Cardiology', experience: 10, qualification: 'MD Pediatrics, Fellowship Pediatric Cardiology', consultationFee: 1000, gender: 'Female', languages: 'English, Hindi, Telugu' },
  { firstName: 'Vikram', lastName: 'Singh', email: 'dr.vikram@hospital.com', specialization: 'General Surgery', experience: 20, qualification: 'MS, FRCS', consultationFee: 1500, gender: 'Male', languages: 'English, Hindi, Punjabi' },
  { firstName: 'Ananya', lastName: 'Gupta', email: 'dr.ananya@hospital.com', specialization: 'Dermatology & Cosmetology', experience: 8, qualification: 'MD Dermatology', consultationFee: 800, gender: 'Female', languages: 'English, Hindi' },
  { firstName: 'Mohammed', lastName: 'Farooq', email: 'dr.farooq@hospital.com', specialization: 'Cataract & Glaucoma', experience: 14, qualification: 'MS Ophthalmology, Fellowship', consultationFee: 1000, gender: 'Male', languages: 'English, Hindi, Urdu' },
  { firstName: 'Deepa', lastName: 'Nair', email: 'dr.deepa@hospital.com', specialization: 'Obstetrics & High-Risk Pregnancy', experience: 16, qualification: 'MS OB-GYN, DNB', consultationFee: 1200, gender: 'Female', languages: 'English, Hindi, Malayalam' },
];

const SAMPLE_PATIENTS = [
  { firstName: 'Amit', lastName: 'Verma', phone: '9876543210', gender: 'Male', bloodGroup: 'B+', email: 'amit.verma@email.com' },
  { firstName: 'Sunita', lastName: 'Devi', phone: '9876543211', gender: 'Female', bloodGroup: 'A+', email: 'sunita.devi@email.com' },
  { firstName: 'Rahul', lastName: 'Joshi', phone: '9876543212', gender: 'Male', bloodGroup: 'O+', email: 'rahul.joshi@email.com' },
  { firstName: 'Meena', lastName: 'Iyer', phone: '9876543213', gender: 'Female', bloodGroup: 'AB+', email: 'meena.iyer@email.com' },
  { firstName: 'Sanjay', lastName: 'Mishra', phone: '9876543214', gender: 'Male', bloodGroup: 'A-', email: 'sanjay.mishra@email.com' },
  { firstName: 'Pooja', lastName: 'Desai', phone: '9876543215', gender: 'Female', bloodGroup: 'B-', email: 'pooja.desai@email.com' },
  { firstName: 'Vijay', lastName: 'Rao', phone: '9876543216', gender: 'Male', bloodGroup: 'O-', email: 'vijay.rao@email.com' },
  { firstName: 'Kavita', lastName: 'Joshi', phone: '9876543217', gender: 'Female', bloodGroup: 'A+', email: 'kavita.joshi@email.com' },
  { firstName: 'Ravi', lastName: 'Tiwari', phone: '9876543218', gender: 'Male', bloodGroup: 'B+', email: 'ravi.tiwari@email.com' },
  { firstName: 'Neha', lastName: 'Agarwal', phone: '9876543219', gender: 'Female', bloodGroup: 'O+', email: 'neha.agarwal@email.com' },
];

const SAMPLE_FAQS = [
  { question: 'What are your hospital timings?', answer: 'Our hospital is open 24/7 for emergency services. OPD hours are Monday to Saturday, 8:00 AM to 8:00 PM.', category: 'General', sortOrder: 1 },
  { question: 'How can I book an appointment?', answer: 'You can book an appointment online through our website, by calling us, or by visiting the reception desk.', category: 'Appointments', sortOrder: 2 },
  { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance providers. Please bring your insurance card during your visit.', category: 'Billing', sortOrder: 3 },
  { question: 'Is parking available?', answer: 'Yes, we have free parking available for patients and visitors in our multi-level parking facility.', category: 'General', sortOrder: 4 },
  { question: 'Do you offer online consultations?', answer: 'Yes, we offer video consultations for select departments. You can book online consultation through our website.', category: 'Appointments', sortOrder: 5 },
  { question: 'What documents should I bring?', answer: 'Please bring a valid ID proof, previous medical records, insurance card (if applicable), and referral letter (if any).', category: 'General', sortOrder: 6 },
];

async function main() {
  console.log('Seeding database...');

  // 1. Create Permissions
  console.log('Creating permissions...');
  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    });
  }
  console.log(`  Created ${PERMISSIONS.length} permissions`);

  // 2. Create Roles
  console.log('Creating roles...');
  const roleMap: Record<string, string> = {};
  for (const role of ROLES) {
    const created = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
    roleMap[role.name] = created.id;
  }
  console.log(`  Created ${ROLES.length} roles`);

  // 3. Assign permissions to roles
  console.log('Assigning permissions to roles...');
  for (const [roleName, permNames] of Object.entries(ROLE_PERMISSIONS)) {
    const roleId = roleMap[roleName];
    if (!roleId) continue;

    const permRecords = await prisma.permission.findMany({
      where: { name: { in: permNames } },
    });

    for (const perm of permRecords) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId, permissionId: perm.id } },
        update: {},
        create: { roleId, permissionId: perm.id },
      });
    }
  }
  console.log('  Permissions assigned to roles');

  // 4. Create Super Admin
  console.log('Creating Super Admin...');
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@hospital.com' },
    update: {},
    create: {
      email: 'superadmin@hospital.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      isSuperAdmin: true,
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: superAdmin.id, roleId: roleMap['Super Admin'] } },
    update: {},
    create: { userId: superAdmin.id, roleId: roleMap['Super Admin'] },
  });
  console.log('  Super Admin created: superadmin@hospital.com / Admin@123');

  // 5. Create Hospital
  console.log('Creating sample hospital...');
  const hospital = await prisma.hospital.upsert({
    where: { slug: 'city-care-hospital' },
    update: {},
    create: {
      name: 'City Care Hospital',
      slug: 'city-care-hospital',
      email: 'info@citycare.com',
      phone: '+91-11-23456789',
      address: '123 Health Avenue, Medical District',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110001',
      description: 'City Care Hospital is a leading multi-specialty hospital providing world-class healthcare services with state-of-the-art technology and experienced medical professionals.',
      latitude: 28.6139,
      longitude: 77.2090,
    },
  });
  console.log(`  Hospital created: ${hospital.name}`);

  // 6. Create Hospital Admin
  const hospitalAdmin = await prisma.user.upsert({
    where: { email: 'admin@citycare.com' },
    update: {},
    create: {
      email: 'admin@citycare.com',
      password: hashedPassword,
      firstName: 'Hospital',
      lastName: 'Admin',
      hospitalId: hospital.id,
    },
  });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: hospitalAdmin.id, roleId: roleMap['Hospital Admin'] } },
    update: {},
    create: { userId: hospitalAdmin.id, roleId: roleMap['Hospital Admin'] },
  });
  console.log('  Hospital Admin created: admin@citycare.com / Admin@123');

  // 7. Create Departments
  console.log('Creating departments...');
  const deptMap: Record<string, string> = {};
  for (const dept of DEPARTMENTS) {
    const created = await prisma.department.upsert({
      where: { id: dept.name },
      update: {},
      create: {
        name: dept.name,
        description: dept.description,
        hospitalId: hospital.id,
      },
    });
    deptMap[dept.name] = created.id;
  }
  // Fix: re-query departments by name+hospitalId since unique constraint is on name
  for (const dept of DEPARTMENTS) {
    const found = await prisma.department.findFirst({
      where: { name: dept.name, hospitalId: hospital.id },
    });
    if (found) deptMap[dept.name] = found.id;
  }
  console.log(`  Created ${DEPARTMENTS.length} departments`);

  // 8. Create Doctors
  console.log('Creating doctors...');
  const deptNames = Object.keys(deptMap);
  for (let i = 0; i < SAMPLE_DOCTORS.length; i++) {
    const doc = SAMPLE_DOCTORS[i];
    const deptName = deptNames[i % deptNames.length];
    const deptId = deptMap[deptName];

    const doctor = await prisma.doctor.upsert({
      where: { email: doc.email },
      update: {},
      create: {
        hospitalId: hospital.id,
        departmentId: deptId,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: `987650${String(i + 10).padStart(4, '0')}`,
        gender: doc.gender,
        qualification: doc.qualification,
        experience: doc.experience,
        specialization: doc.specialization,
        consultationFee: doc.consultationFee,
        languages: doc.languages,
        bio: `Dr. ${doc.firstName} ${doc.lastName} is an experienced ${doc.specialization} specialist with ${doc.experience} years of clinical experience.`,
      },
    });

    // Create doctor user account
    const docUser = await prisma.user.upsert({
      where: { email: doc.email },
      update: {},
      create: {
        email: doc.email,
        password: hashedPassword,
        firstName: doc.firstName,
        lastName: doc.lastName,
        hospitalId: hospital.id,
      },
    });
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: docUser.id, roleId: roleMap['Doctor'] } },
      update: {},
      create: { userId: docUser.id, roleId: roleMap['Doctor'] },
    });
    await prisma.doctor.update({ where: { email: doc.email }, data: { userId: docUser.id } });

    // Create schedules (Mon-Sat, 9AM-5PM, 30min slots)
    for (let day = 1; day <= 6; day++) {
      await prisma.doctorSchedule.upsert({
        where: { doctorId_dayOfWeek: { doctorId: doctor.id, dayOfWeek: day } },
        update: {},
        create: {
          doctorId: doctor.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '17:00',
          slotDuration: 30,
        },
      });
    }
  }
  console.log(`  Created ${SAMPLE_DOCTORS.length} doctors with schedules`);

  // 9. Create Patients
  console.log('Creating patients...');
  for (let i = 0; i < SAMPLE_PATIENTS.length; i++) {
    const p = SAMPLE_PATIENTS[i];
    await prisma.patient.create({
      data: {
        hospitalId: hospital.id,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        phone: p.phone,
        gender: p.gender,
        bloodGroup: p.bloodGroup,
        dateOfBirth: new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        emergencyContactName: `Emergency Contact of ${p.firstName}`,
        emergencyContactPhone: `987654${String(4000 + i).slice(-4)}`,
      },
    });
  }
  console.log(`  Created ${SAMPLE_PATIENTS.length} patients`);

  // 10. Create Staff
  console.log('Creating staff...');
  const staffData = [
    { firstName: 'Ritu', lastName: 'Singh', department: 'Front Desk', designation: 'Senior Receptionist', shift: 'morning' },
    { firstName: 'Amit', lastName: 'Kumar', department: 'Pharmacy', designation: 'Head Pharmacist', shift: 'morning' },
    { firstName: 'Priyanka', lastName: 'Sharma', department: 'Laboratory', designation: 'Senior Lab Technician', shift: 'morning' },
    { firstName: 'Geeta', lastName: 'Devi', department: 'Nursing', designation: 'Head Nurse', shift: 'morning' },
    { firstName: 'Raj', lastName: 'Verma', department: 'Finance', designation: 'Senior Cashier', shift: 'morning' },
  ];
  for (let i = 0; i < staffData.length; i++) {
    const s = staffData[i];
    const empId = `EMP-${String(i + 1).padStart(3, '0')}`;
    const staffUser = await prisma.user.upsert({
      where: { email: `${s.firstName.toLowerCase()}.${s.lastName.toLowerCase()}@hospital.com` },
      update: {},
      create: {
        email: `${s.firstName.toLowerCase()}.${s.lastName.toLowerCase()}@hospital.com`,
        password: hashedPassword,
        firstName: s.firstName,
        lastName: s.lastName,
        hospitalId: hospital.id,
      },
    });
    await prisma.staff.create({
      data: {
        hospitalId: hospital.id,
        userId: staffUser.id,
        employeeId: empId,
        firstName: s.firstName,
        lastName: s.lastName,
        email: staffUser.email,
        department: s.department,
        designation: s.designation,
        shift: s.shift,
        joinDate: new Date('2023-01-15'),
        salary: 35000,
      },
    });

    // Assign appropriate role
    let roleName = 'Nurse';
    if (s.department === 'Front Desk') roleName = 'Receptionist';
    else if (s.department === 'Pharmacy') roleName = 'Pharmacist';
    else if (s.department === 'Laboratory') roleName = 'Lab Technician';
    else if (s.department === 'Finance') roleName = 'Cashier';

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: staffUser.id, roleId: roleMap[roleName] } },
      update: {},
      create: { userId: staffUser.id, roleId: roleMap[roleName] },
    });
  }
  console.log(`  Created ${staffData.length} staff members`);

  // 11. Create CMS content
  console.log('Creating CMS content...');
  await prisma.cmsPage.upsert({
    where: { slug: 'about-us' },
    update: {},
    create: {
      slug: 'about-us',
      title: 'About City Care Hospital',
      content: '<p>City Care Hospital is a leading multi-specialty healthcare institution established in 2005. With over 200 beds, 50+ departments, and 200+ doctors, we provide comprehensive healthcare services to our community.</p><p>Our mission is to deliver accessible, affordable, and quality healthcare with compassion and excellence.</p>',
      metaTitle: 'About Us - City Care Hospital',
      metaDesc: 'Learn about City Care Hospital, a leading multi-specialty hospital with world-class healthcare services.',
      isPublished: true,
    },
  });

  for (const faq of SAMPLE_FAQS) {
    await prisma.faq.create({ data: faq });
  }
  console.log(`  Created ${SAMPLE_FAQS.length} FAQs and CMS pages`);

  // 12. Create Testimonials
  console.log('Creating testimonials...');
  const testimonials = [
    { patientName: 'Rajiv Malhotra', rating: 5, content: 'Excellent hospital with very professional doctors. Dr. Sharma saved my life with his expert cardiac surgery. Highly recommended!' },
    { patientName: 'Suman Kapoor', rating: 5, content: 'The pediatric department is amazing. My daughter was well taken care of. The staff is very caring and attentive.' },
    { patientName: 'Mohammed Iqbal', rating: 4, content: 'Great facility and experienced doctors. The only improvement needed is reducing wait times during peak hours.' },
    { patientName: 'Anita Deshmukh', rating: 5, content: 'Had my knee replacement surgery here. Dr. Kumar is exceptional. Post-surgery care was outstanding. Walking normally now!' },
    { patientName: 'Suresh Pillai', rating: 5, content: 'Best eye care facility. Dr. Farooq performed my cataract surgery flawlessly. Clear vision restored!' },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: { ...t, isPublished: true } });
  }
  console.log(`  Created ${testimonials.length} testimonials`);

  console.log('\nSeeding completed successfully!');
  console.log('Login credentials:');
  console.log('  Super Admin: superadmin@hospital.com / Admin@123');
  console.log('  Hospital Admin: admin@citycare.com / Admin@123');
  console.log('  Doctors: dr.rawat@hospital.com / dr.priya@hospital.com ... / Admin@123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
