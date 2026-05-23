import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'DEPLOYMENT_GUIDE.md',
  'GO_TO_MARKET.md',
  'RESEARCH_ENGINES.md',
  'BRAND_GUIDELINES.md',
  'SECURITY.md',
  'ASSETS_AND_ARTIFACTS.md',
  'package.json',
  'scripts/test-baseline.js',
  'scripts/build-baseline.js',
];

const missing = requiredFiles.filter((file) => !existsSync(resolve(process.cwd(), file)));

if (missing.length > 0) {
  console.error('Baseline validation failed. Missing required files:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Baseline validation passed. Required revvel-standard files are present.');
