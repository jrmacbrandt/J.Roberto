import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
  'public/about-profile.png',
  'public/favicon-source.png',
  'public/jrbrandt-assinatura-bg.png',
  'public/profile.png',
  'public/images/fastbeautypro.jpg',
  'public/images/imobiflow.jpg',
  'public/images/poco-artesiano.jpg',
  'public/images/landing.png'
];

async function convert() {
  for (const img of images) {
    const ext = path.extname(img);
    const output = img.replace(ext, '.webp');
    try {
      await sharp(img)
        .webp({ quality: 80 })
        .toFile(output);
      console.log(`Converted ${img} to ${output}`);
    } catch (err) {
      console.error(`Failed to convert ${img}:`, err);
    }
  }
}

convert();
