import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const src = './public/favicon-source.png';
const outDir = './public';

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },   // Apple iOS
  { name: 'favicon.png', size: 32 },              // Main PNG favicon
];

for (const { name, size } of sizes) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(outDir, name));
  console.log(`✓ Generated ${name} (${size}x${size})`);
}

// Generate .ico file (multi-size) using 16, 32, 48
// We'll create a simple ICO from the 32px PNG bytes
// Since we can't use external ICO lib, we copy favicon-32x32.png as favicon.ico fallback
import { copyFileSync } from 'fs';
copyFileSync(join(outDir, 'favicon-32x32.png'), join(outDir, 'favicon.ico'));
console.log('✓ Generated favicon.ico (from 32x32)');

console.log('\n✅ All favicons generated!');
