const fetch = require('node-fetch');
async function test() {
  const loginRes = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'dr.crrawat@agraheartcentre.com', password: 'password123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.accessToken;
  const res = await fetch('http://localhost:3001/api/appointments?limit=100', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  console.log('STATUS:', res.status);
  const data = await res.json();
  console.log(JSON.stringify(data).substring(0, 500));
}
test();
