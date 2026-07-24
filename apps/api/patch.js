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
    'return (/* @__PURE__ */ new Date(`${value}Z`)).toISOString().replace(/(\\.000)?Z$/, "+00:00");',
    'return (value instanceof Date ? value : new Date(typeof value === "string" ? value.replace(/ /g, "T") + "Z" : `${value}Z`)).toISOString().replace(/(\\.000)?Z$/, "+00:00");'
  );
  fs.writeFileSync(targetPath, code);
  console.log('Patched adapter-mariadb successfully.');
}
