// scripts/check-prisma.js
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Prisma installation...');

const locations = [
  './node_modules/.prisma/client',
  './node_modules/@prisma/client',
  './src/lib/generated/prisma',
  './.prisma/client',
];

locations.forEach((location) => {
  if (fs.existsSync(location)) {
    console.log(`\n📁 ${location}:`);
    const files = fs.readdirSync(location);

    const binaryFiles = files.filter((f) => f.includes('.so.node') || f.includes('query_engine'));
    const otherFiles = files.filter((f) => !f.includes('.so.node') && !f.includes('query_engine'));

    if (binaryFiles.length > 0) {
      console.log('   ✅ Binary files:', binaryFiles);
    } else {
      console.log('   ❌ No binary files found');
    }

    console.log('   Other files:', otherFiles.length);
  } else {
    console.log(`\n📁 ${location}: ❌ Directory not found`);
  }
});
