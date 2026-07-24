async function test() {
  try {
    // 1. Login
    console.log('Logging in...');
    const loginRes = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'dr.crrawat@agraheartcentre.com', password: 'Admin@123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.accessToken;
    
    // 2. Get doctors
    const docRes = await fetch('http://localhost:3001/api/doctors', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const docData = await docRes.json();
    const doc = docData.data.find(d => d.email === 'dr.crrawat@agraheartcentre.com');
    
    // 3. Get today's queue
    console.log('Getting queue...');
    const qRes = await fetch(`http://localhost:3001/api/queue/${doc.id}/today`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    console.log('qData:', qData);
    const queue = qData;
    const tokens = qData.tokens;
    
    console.log('Tokens:', tokens.length);
    if(tokens.length === 0) return console.log('No tokens');

    // 4. Find if any is serving
    let serving = tokens.find(t => t.status === 'serving');
    
    if (serving) {
       console.log('Completing serving token...');
       try {
         const res = await fetch(`http://localhost:3001/api/queue/token/${serving.id}/complete`, {
           method: 'PUT',
           headers: { Authorization: `Bearer ${token}` }
         });
         const data = await res.json();
         console.log(res.status, data);
       } catch(e) {
         console.error('Error completing:', e);
       }
    } else {
       console.log('Calling next token...');
       try {
         const res = await fetch(`http://localhost:3001/api/queue/${queue.id}/next`, {
           method: 'PUT',
           headers: { Authorization: `Bearer ${token}` }
         });
         const data = await res.json();
         console.log(res.status, data);
       } catch(e) {
         console.error('Error calling next:', e);
       }
    }
    
  } catch (err) {
    console.error('Outer error:', err);
  }
}

test();
