#!/usr/bin/env node

// Script para verificar que la instalación y configuración están correctas
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto...\n');

// Verificar que estamos en el directorio correcto
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: No se encuentra package.json. Asegúrate de estar en el directorio raíz del proyecto.');
  process.exit(1);
}

// Verificar que existe el directorio del backend
if (!fs.existsSync('../backend/inventario-app')) {
  console.error('❌ Error: No se encuentra el directorio del backend en ../backend/inventario-app');
  process.exit(1);
}

// Verificar archivos de configuración
const requiredFiles = [
  'nuxt.config.ts',
  'package.json',
  '../backend/inventario-app/package.json',
  '../backend/inventario-app/src/main.ts',
  '../backend/inventario-app/.env'
];

console.log('📁 Verificando archivos requeridos...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NO ENCONTRADO`);
  }
}

console.log('\n🚀 Verificación completada.');
console.log('\n📝 Para ejecutar el proyecto:');
console.log('1. pnpm run install:all');
console.log('2. pnpm run dev:full');
console.log('\n🌐 Luego visita: http://localhost:3000');