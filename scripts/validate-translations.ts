/**
 * Script para validar que todos los archivos de traducción tienen las mismas claves
 */

import * as fs from 'fs';
import * as path from 'path';

// Colores para la terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

interface TranslationKeys {
  [key: string]: string | TranslationKeys | Array<any>;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Lee un archivo JSON y devuelve su contenido
 */
function readTranslationFile(filePath: string): TranslationKeys {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`${colors.red}Error al leer ${filePath}:${colors.reset}`, error);
    process.exit(1);
  }
}

/**
 * Obtiene todas las claves de un objeto de forma recursiva
 */
function getAllKeys(obj: TranslationKeys, prefix = ''): Set<string> {
  const keys = new Set<string>();

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      keys.add(fullKey);
      // Para arrays, también validamos la estructura del primer elemento
      if (value.length > 0 && typeof value[0] === 'object') {
        const arrayItemKeys = getAllKeys(value[0] as TranslationKeys, `${fullKey}[0]`);
        arrayItemKeys.forEach(k => keys.add(k));
      }
    } else if (typeof value === 'object' && value !== null) {
      keys.add(fullKey);
      const nestedKeys = getAllKeys(value as TranslationKeys, fullKey);
      nestedKeys.forEach(k => keys.add(k));
    } else {
      keys.add(fullKey);
    }
  }

  return keys;
}

/**
 * Compara dos conjuntos de claves y devuelve las diferencias
 */
function compareKeys(
  baseKeys: Set<string>,
  compareKeys: Set<string>,
  baseLang: string,
  compareLang: string
): { missing: string[]; extra: string[] } {
  const missing: string[] = [];
  const extra: string[] = [];

  // Claves que están en base pero no en compare
  baseKeys.forEach(key => {
    if (!compareKeys.has(key)) {
      missing.push(key);
    }
  });

  // Claves que están en compare pero no en base
  compareKeys.forEach(key => {
    if (!baseKeys.has(key)) {
      extra.push(key);
    }
  });

  return { missing, extra };
}

/**
 * Valida que un archivo de traducción tenga valores no vacíos
 */
function validateValues(obj: TranslationKeys, prefix = ''): string[] {
  const emptyKeys: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      if (value.length === 0) {
        emptyKeys.push(fullKey);
      }
    } else if (typeof value === 'object' && value !== null) {
      const nestedEmpty = validateValues(value as TranslationKeys, fullKey);
      emptyKeys.push(...nestedEmpty);
    } else if (typeof value === 'string' && value.trim() === '') {
      emptyKeys.push(fullKey);
    }
  }

  return emptyKeys;
}

/**
 * Función principal de validación
 */
function validateTranslations(): ValidationResult {
  const messagesDir = path.join(process.cwd(), 'messages');
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  console.log(`${colors.cyan}🔍 Validando archivos de traducción...${colors.reset}\n`);

  // Leer todos los archivos de traducción
  const translationFiles = fs
    .readdirSync(messagesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      lang: file.replace('.json', ''),
      path: path.join(messagesDir, file),
    }));

  if (translationFiles.length === 0) {
    result.errors.push('No se encontraron archivos de traducción en /messages');
    result.isValid = false;
    return result;
  }

  console.log(`${colors.blue}Idiomas encontrados:${colors.reset} ${translationFiles.map(f => f.lang).join(', ')}\n`);

  // Leer todas las traducciones
  const translations = translationFiles.map(file => ({
    lang: file.lang,
    keys: getAllKeys(readTranslationFile(file.path)),
    content: readTranslationFile(file.path),
  }));

  // Usar el primer idioma como referencia
  const [baseTranslation, ...otherTranslations] = translations;

  console.log(`${colors.blue}Usando '${baseTranslation.lang}' como referencia${colors.reset}\n`);

  // Comparar cada idioma con el de referencia
  for (const translation of otherTranslations) {
    console.log(`${colors.yellow}Comparando ${baseTranslation.lang} ↔ ${translation.lang}${colors.reset}`);

    const { missing, extra } = compareKeys(
      baseTranslation.keys,
      translation.keys,
      baseTranslation.lang,
      translation.lang
    );

    if (missing.length > 0) {
      result.isValid = false;
      result.errors.push(
        `\n❌ ${translation.lang} le faltan ${missing.length} clave(s):\n   - ${missing.join('\n   - ')}`
      );
    }

    if (extra.length > 0) {
      result.warnings.push(
        `\n⚠️  ${translation.lang} tiene ${extra.length} clave(s) adicional(es):\n   - ${extra.join('\n   - ')}`
      );
    }

    if (missing.length === 0 && extra.length === 0) {
      console.log(`   ${colors.green}✓ Todas las claves coinciden${colors.reset}`);
    }

    // Validar valores vacíos
    const emptyKeys = validateValues(translation.content);
    if (emptyKeys.length > 0) {
      result.warnings.push(
        `\n⚠️  ${translation.lang} tiene ${emptyKeys.length} valor(es) vacío(s):\n   - ${emptyKeys.join('\n   - ')}`
      );
    }
  }

  console.log('\n' + '='.repeat(60) + '\n');

  return result;
}

// Ejecutar validación
const result = validateTranslations();

// Mostrar errores
if (result.errors.length > 0) {
  console.log(`${colors.red}ERRORES:${colors.reset}`);
  result.errors.forEach(error => console.log(error));
  console.log();
}

// Mostrar advertencias
if (result.warnings.length > 0) {
  console.log(`${colors.yellow}ADVERTENCIAS:${colors.reset}`);
  result.warnings.forEach(warning => console.log(warning));
  console.log();
}

// Resultado final
if (result.isValid && result.warnings.length === 0) {
  console.log(`${colors.green}✅ ¡Todas las traducciones están correctas!${colors.reset}\n`);
  process.exit(0);
} else if (result.isValid) {
  console.log(`${colors.yellow}⚠️  Las traducciones están completas pero hay advertencias${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}❌ Las traducciones tienen errores que deben corregirse${colors.reset}\n`);
  process.exit(1);
}
