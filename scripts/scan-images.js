#!/usr/bin/env node
/**
 * Script to automatically scan images and generate a JSON manifest
 * 
 * Usage: npm run scan-images
 */

const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '../src/assets/photos');
const OUTPUT_FILE = path.join(__dirname, '../public/images-manifest.json');

const FOLDERS = ['hero', 'la-casita', 'la-olivita', 'casa-luna'];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function getImageFiles(folder) {
  const folderPath = path.join(PHOTOS_DIR, folder);
  
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  
  return fs.readdirSync(folderPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext) && file !== '.gitkeep';
    })
    .sort() // Orden alfabético
    .map(file => `/photos/${folder}/${file}`);
}

function generateManifest() {
  const manifest = {};
  
  FOLDERS.forEach(folder => {
    manifest[folder] = getImageFiles(folder);
  });
  
  // Asegurar que existe el directorio public
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  
  console.log('✅ Manifest generado: public/images-manifest.json');
  console.log('\nImágenes encontradas:');
  FOLDERS.forEach(folder => {
    const count = manifest[folder].length;
    console.log(`  ${folder}: ${count} imagen${count !== 1 ? 'es' : ''}`);
  });
}

// Crear symlink de photos en public si no existe
const publicPhotosLink = path.join(__dirname, '../public/photos');
const photosSource = path.join(__dirname, '../src/assets/photos');

try {
  if (!fs.existsSync(publicPhotosLink)) {
    fs.symlinkSync(photosSource, publicPhotosLink, 'dir');
    console.log('✅ Symlink creado: public/photos -> src/assets/photos');
  }
} catch (error) {
  console.log('ℹ️  No se pudo crear symlink (puede que ya exista o requiera permisos)');
}

// Ejecutar
try {
  generateManifest();
} catch (error) {
  console.error('❌ Error al generar el manifest:', error.message);
  process.exit(1);
}
