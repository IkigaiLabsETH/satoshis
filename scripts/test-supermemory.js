#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Supermemory MCP Integration Test Runner
 * 
 * This script provides an easy way to test the Supermemory integration
 * 
 * Usage:
 *   npm run test:supermemory          # Run unit tests
 *   npm run test:supermemory:manual   # Run manual integration tests
 */

import { execSync } from 'child_process';

const args = process.argv.slice(2);
const command = args[0];

console.log('🧠 Supermemory MCP Integration Test Runner\n');

switch (command) {
  case 'unit':
  case '--unit':
    console.log('Running unit tests...');
    try {
      execSync('npx vitest run src/tests/supermemory.test.ts', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log('\n✅ Unit tests passed!');
    } catch {
      console.log('\n❌ Unit tests failed!');
      process.exit(1);
    }
    break;

  case 'manual':
  case '--manual':
    console.log('Running manual integration tests...');
    console.log('Note: Make sure SUPERMEMORY_API_KEY is set in your environment\n');
    try {
      execSync('npx tsx src/tests/supermemory-manual.test.ts', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log('\n✅ Manual tests completed!');
    } catch {
      console.log('\n❌ Manual tests failed!');
      console.log('Check your API key and internet connection.');
      process.exit(1);
    }
    break;

  case 'all':
  case '--all':
    console.log('Running all Supermemory tests...\n');
    
    // Run unit tests first
    console.log('1️⃣ Running unit tests...');
    try {
      execSync('npx vitest run src/tests/supermemory.test.ts', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log('✅ Unit tests passed!\n');
    } catch {
      console.log('❌ Unit tests failed!');
      process.exit(1);
    }

    // Run manual tests if API key is available
    console.log('2️⃣ Running manual integration tests...');
    if (!process.env.SUPERMEMORY_API_KEY) {
      console.log('⚠️  Skipping manual tests - SUPERMEMORY_API_KEY not set');
      console.log('   Set the environment variable to test with real API calls');
    } else {
      try {
        execSync('npx tsx src/tests/supermemory-manual.test.ts', { 
          stdio: 'inherit',
          cwd: process.cwd()
        });
        console.log('✅ Manual tests completed!');
      } catch {
        console.log('❌ Manual tests failed!');
        console.log('Check your API key and internet connection.');
        process.exit(1);
      }
    }
    break;

  default:
    console.log('Usage:');
    console.log('  node scripts/test-supermemory.js unit     # Run unit tests only');
    console.log('  node scripts/test-supermemory.js manual   # Run manual integration tests');
    console.log('  node scripts/test-supermemory.js all      # Run all tests');
    console.log('');
    console.log('Or use npm scripts:');
    console.log('  npm run test:supermemory          # Run unit tests');
    console.log('  npm run test:supermemory:manual   # Run manual tests');
    console.log('  npm run test:supermemory:all      # Run all tests');
    console.log('');
    console.log('Environment:');
    console.log('  Set SUPERMEMORY_API_KEY for manual integration tests');
    break;
} 