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
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

/**
 * Normalize filename by removing accents and special characters
 * @param {string} filename - The filename to normalize
 * @returns {string} - Normalized filename
 */
function normalizeFilename(filename) {
  // Normalize unicode characters (decompose accented characters)
  const normalized = filename.normalize('NFD');
  
  // Remove diacritical marks (accents)
  const withoutAccents = normalized.replace(/[\u0300-\u036f]/g, '');
  
  // Replace spaces with hyphens and remove special characters
  // Keep only: letters, numbers, hyphens, underscores, dots
  const cleaned = withoutAccents.replace(/[^a-zA-Z0-9.\-_]/g, '-');
  
  // Remove multiple consecutive hyphens
  const final = cleaned.replace(/-+/g, '-');
  
  return final;
}

function getImageFiles(folder) {
  // Read from public/photos instead of src/assets/photos
  // This ensures we get the normalized filenames
  const folderPath = path.join(__dirname, '../public/photos', folder);
  
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

// Copy photos to public instead of symlink (for Vercel compatibility)
const publicPhotosDir = path.join(__dirname, '../public/photos');
const photosSource = path.join(__dirname, '../src/assets/photos');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      const destPath = path.join(dest, entry.name);
      copyDirectory(srcPath, destPath);
    } else {
      // Only copy image files (skip README.md, index.ts, .gitkeep, etc.)
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        // Normalize filename to remove accents and special characters
        const normalizedName = normalizeFilename(entry.name);
        const destPath = path.join(dest, normalizedName);
        
        // Log if filename was changed
        if (normalizedName !== entry.name) {
          console.log(`  📝 Normalized: ${entry.name} → ${normalizedName}`);
        }
        
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

try {
  // Remove old symlink if exists
  if (fs.existsSync(publicPhotosDir)) {
    const stats = fs.lstatSync(publicPhotosDir);
    if (stats.isSymbolicLink()) {
      fs.unlinkSync(publicPhotosDir);
      console.log('🗑️  Symlink anterior eliminado');
    } else {
      // Remove existing directory to start fresh
      fs.rmSync(publicPhotosDir, { recursive: true, force: true });
      console.log('🗑️  Directorio anterior eliminado');
    }
  }
  
  // Copy photos to public
  copyDirectory(photosSource, publicPhotosDir);
  console.log('✅ Fotos copiadas: public/photos/');
} catch (error) {
  console.log('⚠️  Error al copiar fotos:', error.message);
}

// Ejecutar
try {
  generateManifest();
} catch (error) {
  console.error('❌ Error al generar el manifest:', error.message);
  process.exit(1);
}
