const fs = require('fs');
const path = require('path');

// Helpers
const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

const clientDir = path.join(__dirname, '../client');
const serverPublicDir = path.join(__dirname, '../server/public');

console.log('🏗️  Building CRMS Monorepo...');
console.log(`from: ${clientDir}`);
console.log(`to:   ${serverPublicDir}`);

// 1. Clean previous build
if (fs.existsSync(serverPublicDir)) {
    console.log('🧹 Cleaning old build...');
    fs.rmSync(serverPublicDir, { recursive: true, force: true });
}

// 2. Copy Client to Server Public
console.log('📦 Copying client files...');
copyRecursiveSync(clientDir, serverPublicDir);

console.log('✅ Build Complete! Server is ready to deploy.');
