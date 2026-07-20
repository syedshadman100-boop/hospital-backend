const mysql = require('mysql2/promise');
const crypto = require('crypto');

function uuid() {
  return crypto.randomUUID();
}

async function seed() {
  const c = await mysql.createConnection('mysql://root@localhost:3307/hospital');
  
  const [existing] = await c.execute("SELECT id FROM hospitals WHERE slug = 'agra-heart-centre'");
  if (existing.length > 0) {
    console.log('Hospital already exists:', existing[0].id);
    await c.end();
    return;
  }

  const hospitalId = uuid();
  
  await c.execute(
    `INSERT INTO hospitals (id, name, slug, domain, customDomain, email, phone, address, city, state, country, pincode, description, isActive, createdAt, updatedAt) VALUES (?, 'Agra Heart Centre', 'agra-heart-centre', 'agraheartcentre.com', 'www.agraheartcentre.com', 'agraheartcentre96@gmail.com', '+91-7830000618', '5, Church Road, Civil Lines, Ram Nagar Colony, Agra, UP - 282002', 'Agra', 'Uttar Pradesh', 'India', '282002', 'Agra first and most advanced cardiac centre, established in 1990 by Dr. C.R. Rawat.', 1, NOW(), NOW())`,
    [hospitalId]
  );
  console.log('Created hospital:', hospitalId);

  const settings = [
    ['heroTagline', 'Excellence in Cardiac Care'],
    ['heroSubtitle', 'Agra First & Most Advanced Cardiac Centre. Echo, TMT, Angiography, Angioplasty, Pacemaker, TAVI.'],
    ['primaryColor', '#059669'],
    ['emergencyNumber', '+91-7830000618'],
    ['landlineNumber', '(0562) 2850356'],
    ['email', 'agraheartcentre96@gmail.com'],
    ['chatbotGreeting', 'Hello! Welcome to Agra Heart Centre. How can I assist you today?'],
    ['chatbotName', 'AHC Assistant'],
    ['copyrightYear', '2024'],
    ['opdHours', 'Monday to Saturday: 9:00 AM - 6:00 PM'],
    ['establishedYear', '1990'],
    ['statsYears', '35'],
    ['statsDoctors', '50'],
    ['statsRanking', '15'],
    ['statsDepartments', '12'],
  ];

  for (const [key, value] of settings) {
    await c.execute(
      `INSERT INTO hospital_settings (id, hospitalId, \`key\`, value, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [uuid(), hospitalId, key, value]
    );
  }
  console.log('Inserted', settings.length, 'settings');

  await c.execute('UPDATE departments SET hospitalId = ? WHERE hospitalId IS NULL', [hospitalId]);
  await c.execute('UPDATE doctors SET hospitalId = ? WHERE hospitalId IS NULL', [hospitalId]);
  await c.execute('UPDATE patients SET hospitalId = ? WHERE hospitalId IS NULL', [hospitalId]);
  console.log('Linked existing data to hospital');

  const [hospitals] = await c.execute('SELECT id, name, slug FROM hospitals');
  console.log('\nHospitals:', JSON.stringify(hospitals, null, 2));
  
  await c.end();
}

seed().catch(console.error);
