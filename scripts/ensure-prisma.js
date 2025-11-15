// scripts/ensure-prisma.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Ensuring Prisma binaries...');

// Generate Prisma client
execSync('npx prisma generate', { stdio: 'inherit' });

// Check if binaries exist in node_modules
const nodeModulesClient = path.join(__dirname, '../node_modules/.prisma/client');
const nodeModulesPrisma = path.join(__dirname, '../node_modules/@prisma/client');
const customOutputDir = path.join(__dirname, '../src/lib/generated/prisma');

// Create custom directory if it doesn't exist
if (!fs.existsSync(customOutputDir)) {
  fs.mkdirSync(customOutputDir, { recursive: true });
}

// Function to copy all files from source to target
function copyAllFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`❌ Source directory not found: ${sourceDir}`);
    return;
  }

  const files = fs.readdirSync(sourceDir);
  let copiedCount = 0;

  files.forEach((file) => {
    const source = path.join(sourceDir, file);
    const target = path.join(targetDir, file);

    try {
      if (fs.lstatSync(source).isFile()) {
        fs.copyFileSync(source, target);
        console.log(`✓ Copied: ${file}`);
        copiedCount++;
      }
    } catch (error) {
      console.log(`⚠ Failed to copy ${file}:`, error.message);
    }
  });

  return copiedCount;
}

// Copy from both possible locations
console.log('Looking for Prisma binaries...');
let totalCopied = 0;

// Check node_modules/.prisma/client first
totalCopied += copyAllFiles(nodeModulesClient, customOutputDir);

// Also check @prisma/client
totalCopied += copyAllFiles(nodeModulesPrisma, customOutputDir);

console.log(`✅ Copied ${totalCopied} files total`);

// Verify binaries were copied
const binaryFiles = fs
  .readdirSync(customOutputDir)
  .filter((file) => file.includes('.so.node') || file.includes('query_engine'));

if (binaryFiles.length > 0) {
  console.log('✅ Found binary files:', binaryFiles);
} else {
  console.log('❌ No binary files found in target directory');
  console.log('Files in target directory:', fs.readdirSync(customOutputDir));
}
