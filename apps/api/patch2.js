const fs = require('fs');
const path = require('path');

let targetPath;
try {
  targetPath = require.resolve('@prisma/adapter-mariadb');
} catch (e) {
  targetPath = path.resolve(__dirname, 'node_modules/@prisma/adapter-mariadb/dist/index.js');
}

if (fs.existsSync(targetPath)) {
  let code = fs.readFileSync(targetPath, 'utf8');
  code = code.replace(
    'return (value instanceof Date ? value : new Date(typeof value === "string" ? value.replace(/ /g, "T") + "Z" : `${value}Z`)).toISOString().replace(/(\\.000)?Z$/, "+00:00");',
    'try { return (value instanceof Date ? value : new Date(typeof value === "string" ? value.replace(/ /g, "T") + "Z" : `${value}Z`)).toISOString().replace(/(\\.000)?Z$/, "+00:00"); } catch(e) { console.log("INVALID DATE VALUE:", typeof value, value); throw e; }'
  );
  fs.writeFileSync(targetPath, code);
  console.log('Patched with logging.');
}
